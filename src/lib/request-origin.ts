import type { NextRequest } from "next/server";

export function isSameOrigin(request: NextRequest) {
  const site = request.headers.get("sec-fetch-site");
  const origin = request.headers.get("origin");
  if (!origin || (site && site !== "same-origin")) return false;
  // NextURL normalizes loopback hostnames. Preserve the actual browser Host.
  const host = request.headers.get("host");
  const expected = host ? `${request.nextUrl.protocol}//${host}` : request.nextUrl.origin;
  return origin === expected;
}
