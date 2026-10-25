import assetData from "@/data/market-links.json";
export interface MarketAsset {
  stockId: string; ticker: string; tossUrl: string; logoPath?: string;
  logoSourceUrl?: string; verificationSource: string; checkedAt: string;
}
export const marketAssets = assetData as Record<string,MarketAsset>;
export function getMarketAsset(id: string) { return marketAssets[id]; }

// Toss's official OneLink routes installed mobile apps through its securities
// scheme, while desktop and app-less browsers get their matching web page.
// See docs/toss-app-links.md for the first-party route and fallback evidence.
export function getTossLink(id?: string): string {
  const asset = id ? getMarketAsset(id) : undefined;
  const webUrl = asset?.tossUrl ?? "https://www.tossinvest.com/";
  const stockCode = asset ? new URL(asset.tossUrl).pathname.split("/")[2] : undefined;
  const mobileUrl = new URL("https://service.tossinvest.com");
  if (stockCode) mobileUrl.searchParams.set("nextLandingUrl", `/stocks/${stockCode}`);

  const scheme = new URL("supertoss://securities");
  scheme.searchParams.set("url", mobileUrl.toString());
  const fallback = stockCode
    ? `https://contents.tossinvest.com/stocks/${stockCode}`
    : "https://www.tossinvest.com/";
  const link = new URL("https://toss.onelink.me/3563614660");
  link.searchParams.set("pid", "referral");
  link.searchParams.set("af_dp", scheme.toString());
  link.searchParams.set("af_force_deeplink", "true");
  link.searchParams.set("af_web_dp", webUrl);
  link.searchParams.set("af_ios_url", fallback);
  link.searchParams.set("af_android_url", fallback);
  return link.toString();
}
