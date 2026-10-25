import { stocks } from "@/lib/stocks";
import type { StockPersonality } from "@/types/personality";

export type MarketFilter = "ALL" | StockPersonality["market"];
const aliases: Record<string, string> = {
  "kr-005380": "현대차",
  "kr-005930": "삼전",
  "us-nvda": "엔비디아",
  "us-aapl": "애플",
  "us-tsla": "테슬라",
  "us-ko": "코카콜라",
};
const normalize = (value: string) => value.toLowerCase().replace(/\s/g, "");

export function searchStocks(query: string, market: MarketFilter = "ALL") {
  const term = normalize(query);
  return stocks.filter(stock =>
    (market === "ALL" || stock.market === market) &&
    normalize(`${stock.name} ${stock.ticker} ${stock.sector} ${aliases[stock.id] ?? ""}`).includes(term)
  );
}
