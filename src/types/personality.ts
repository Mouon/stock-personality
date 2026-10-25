export const axisKeys = ["volatility", "vision", "stability", "independence", "momentum", "unpredictability"] as const;
export type Axis = (typeof axisKeys)[number];
export type Traits = Record<Axis, number>;
export interface StockPersonality {
  id: string; ticker: string; name: string; market: "SP500" | "KOSPI"; sector: string;
  traits: Traits; personalityTitle: string; oneLiner: string; description: string;
  strengths: string[]; weaknesses: string[]; dataAsOf: string; profileBasis: string[];
  sourceIds: string[]; membershipVerified: boolean;
}
export interface Question { id: string; context: string; title: string; options: { label: string; scores: Partial<Traits> }[]; }
export interface StockMatch { stock: StockPersonality; similarity: number; distance: number; alignedAxes: Axis[]; }
export interface Analysis { scores: Traits; matches: StockMatch[]; }
