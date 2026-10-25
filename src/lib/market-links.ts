import assetData from "@/data/market-links.json";
export interface MarketAsset {
  stockId: string; ticker: string; tossUrl: string; logoPath?: string;
  logoSourceUrl?: string; verificationSource: string; checkedAt: string;
}
export const marketAssets = assetData as Record<string,MarketAsset>;
export function getMarketAsset(id: string) { return marketAssets[id]; }
