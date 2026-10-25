import stockData from "./stocks.json";
export const universe={total:stockData.length,us:stockData.filter(stock=>stock.market==="SP500").length,kr:stockData.filter(stock=>stock.market==="KOSPI").length};
