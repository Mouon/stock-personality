import { NextRequest, NextResponse } from "next/server";
import { eventTypes, getRedis, secureEqual } from "@/lib/analytics";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const secret = process.env.ANALYTICS_ADMIN_TOKEN;
  if (!secret || !secureEqual(request.headers.get("authorization") ?? "", `Bearer ${secret}`)) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const redis = getRedis();
  if (!redis) return NextResponse.json({ enabled: false }, { headers: { "Cache-Control": "no-store" } });
  try { const data = await redis.hgetall<Record<string, number>>("human-equity:stats"); return NextResponse.json({ enabled: true, events: Object.fromEntries(eventTypes.map(type => [type, Number(data?.[type] ?? 0)])), note: "share_completed means the browser reported completion, not that a recipient viewed it." }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return NextResponse.json({ error: "Analytics temporarily unavailable" }, { status: 503 }); }
}
