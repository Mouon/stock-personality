import { describe, expect, it } from "vitest";
import { searchStocks } from "@/lib/stock-search";

describe("stock character browsing", () => {
  it("shows the complete verified universe with separate market filters", () => {
    expect(searchStocks("")).toHaveLength(106);
    expect(searchStocks("", "KOSPI")).toHaveLength(56);
    expect(searchStocks("", "SP500")).toHaveLength(50);
  });
  it("finds names, tickers, sectors and familiar Korean nicknames", () => {
    for (const query of ["현대자동차", "현대차", "005380", " 현대 차 "]) {
      expect(searchStocks(query).map(stock => stock.id)).toContain("kr-005380");
    }
    expect(searchStocks("엔비디아")[0].id).toBe("us-nvda");
    expect(searchStocks("aApL")[0].id).toBe("us-aapl");
    expect(searchStocks("자동차").some(stock => stock.id === "kr-005380")).toBe(true);
  });
  it("combines search with the selected market and allows no matches", () => {
    expect(searchStocks("NVDA", "KOSPI")).toHaveLength(0);
    expect(searchStocks("없는종목zzzz")).toHaveLength(0);
    expect(searchStocks("   ")).toHaveLength(106);
  });
});
