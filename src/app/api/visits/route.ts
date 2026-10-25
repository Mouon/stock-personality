import { NextRequest, NextResponse } from "next/server";
import { anonymousToken, getRedis } from "@/lib/analytics";
import { recordVisit } from "@/lib/visits";
import { isSameOrigin } from "@/lib/request-origin";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  const redis = getRedis();
  if (!redis) return NextResponse.json({ enabled: false }, { headers });
  try {
    const visitor = anonymousToken(request.cookies.get("he_visit")?.value);
    const total = await recordVisit(redis, visitor.id);
    if (total < 0) return NextResponse.json({ enabled: true }, { status: 429, headers });
    const response = NextResponse.json({ enabled: true, total }, { headers });
    if (visitor.cookie) response.cookies.set("he_visit", visitor.cookie, { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/", maxAge: 31536000 });
    return response;
  } catch { return NextResponse.json({ enabled: true }, { status: 503, headers }); }
}
