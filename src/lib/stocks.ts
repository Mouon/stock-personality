import stockData from "@/data/stocks.json";
import type { StockPersonality } from "@/types/personality";
export const stocks = stockData as StockPersonality[];
export function getStock(id: unknown) { return typeof id === "string" ? stocks.find(stock => stock.id === id) : undefined; }
export function resultPath(id: string) { return `/result/${encodeURIComponent(id)}`; }
export function isStockId(id: unknown): id is string { return !!getStock(id); }
