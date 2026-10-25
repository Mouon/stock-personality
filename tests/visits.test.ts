import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/visits/route";
import * as analytics from "@/lib/analytics";
import campaigns from "@/data/campaigns.json";
import { getStock } from "@/lib/stocks";
import { isSameOrigin } from "@/lib/request-origin";
const origin = "http://localhost:3017";
const request = (headers: Record<string, string> = {}) => new NextRequest(`${origin}/api/visits`, { method: "POST", headers: { origin, ...headers } });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); });
describe("public visitor count", () => {
  it("preserves the actual loopback Host and rejects mismatched origins", () => {
    expect(isSameOrigin(request({ origin: "http://127.0.0.1:3017", host: "127.0.0.1:3017" }))).toBe(true);
    expect(isSameOrigin(request({ origin: "http://127.0.0.1:3017", host: "other.example" }))).toBe(false);
    expect(isSameOrigin(request({ origin: "" }))).toBe(false);
  });
  it("hides the counter without storage and rejects other origins", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    expect(await (await POST(request())).json()).toEqual({ enabled: false });
    expect((await POST(request({ origin: "https://other.example" }))).status).toBe(403);
    expect((await POST(request({ "sec-fetch-site": "cross-site" }))).status).toBe(403);
  });
  it("returns a stored total and reuses a signed browser identity", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-signing-key");
    const evalMock = vi.fn().mockResolvedValue(42);
    vi.spyOn(analytics, "getRedis").mockReturnValue({ eval: evalMock } as never);
    const first = await POST(request());
    expect(await first.json()).toEqual({ enabled: true, total: 42 });
    const cookie = first.cookies.get("he_visit")!.value;
    const firstKey = evalMock.mock.calls[0][1][0];
    const second = await POST(request({ cookie: `he_visit=${cookie}` }));
    expect(evalMock.mock.calls[1][1][0]).toBe(firstKey);
    expect(second.headers.get("cache-control")).toBe("no-store");
    expect(second.cookies.get("he_visit")).toBeUndefined();
  });
  it("fails quietly on storage errors and throttles excess traffic", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-signing-key");
    vi.spyOn(analytics, "getRedis").mockReturnValue({ eval: vi.fn().mockRejectedValue(new Error("offline")) } as never);
    expect((await POST(request())).status).toBe(503);
    vi.spyOn(analytics, "getRedis").mockReturnValue({ eval: vi.fn().mockResolvedValue(-1) } as never);
    expect((await POST(request())).status).toBe(429);
  });
});
it("maps all six shareholder campaigns to real characters and official pages", () => {
  expect(campaigns).toHaveLength(6);
  expect(new Set(campaigns.map(campaign => campaign.stockId)).size).toBe(6);
  for (const campaign of campaigns) {
    expect(getStock(campaign.stockId)).toBeDefined();
    expect(new URL(campaign.url).origin).toBe("https://bside.ai");
    expect(new URL(campaign.url).pathname).toMatch(/^\/c\//);
  }
});
