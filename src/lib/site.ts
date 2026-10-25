export const brand = "너라는 종목";
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3017");
  try { return new URL(value); } catch { return new URL("http://localhost:3017"); }
}
