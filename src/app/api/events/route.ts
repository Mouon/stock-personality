import { NextRequest, NextResponse } from "next/server";
import { anonymousToken, getRedis, parseEvent, recordEvent } from "@/lib/analytics";
import { isSameOrigin } from "@/lib/request-origin";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Expected JSON" }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 1024) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  // Read only a bounded body, including for chunked requests.
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 1024) { await reader.cancel(); return NextResponse.json({ error: "Payload too large" }, { status: 413 }); } chunks.push(value); }
  let event;
  try { event = parseEvent(JSON.parse(Buffer.concat(chunks).toString("utf8"))); } catch { /* Return a safe validation error. */ }
  if (!event) return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  const redis = getRedis();
  if (!redis) return NextResponse.json({ enabled: false, recorded: false });
  try {
    const token = anonymousToken(request.cookies.get("he_anon")?.value);
    const result = await recordEvent(redis, event, token.id);
    const response = NextResponse.json({ enabled: true, recorded: result === 1 }, { status: result === -1 ? 429 : result === -2 ? 400 : 200 });
    if (token.cookie) response.cookies.set("he_anon", token.cookie, { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "strict", path: "/", maxAge: 86400 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch { return NextResponse.json({ enabled: true, recorded: false, error: "Analytics temporarily unavailable" }, { status: 503 }); }
}
