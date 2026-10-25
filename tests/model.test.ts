import {describe,it,expect} from "vitest";
import {questions} from "@/data/questions";
import {axisKeys} from "@/types/personality";
import {calculateTraits,isTraits,rankStocks,traitDistance} from "@/lib/matching";
import {stocks,getStock,resultPath} from "@/lib/stocks";
import sources from "@/data/sources.json";
import usMembership from "../docs/data/membership-us.json";
import krMembership from "../docs/data/membership-kr.json";
describe("question model",()=>{
 it("contains 12 distinct questions with four distinct scored options",()=>{expect(questions).toHaveLength(12);expect(new Set(questions.map(q=>q.id)).size).toBe(12);for(const q of questions){expect(q.options).toHaveLength(4);expect(new Set(q.options.map(o=>o.label)).size).toBe(4);expect(new Set(q.options.map(o=>JSON.stringify(o.scores))).size).toBe(4);}});
 it("measures every axis twice primarily and twice secondarily",()=>{for(const axis of axisKeys){expect(questions.filter(q=>Math.max(...q.options.map(o=>Math.abs(o.scores[axis]??0)))===3)).toHaveLength(2);expect(questions.filter(q=>Math.max(...q.options.map(o=>Math.abs(o.scores[axis]??0)))===1)).toHaveLength(2);}});
 it("calculates all six axes with exact hand-checked normalization",()=>{expect(calculateTraits(Array(12).fill(0))).toEqual({volatility:0,vision:0,stability:75,independence:38,momentum:0,unpredictability:0});});
 it("can reach 0 and 100 independently for every axis",()=>{for(const axis of axisKeys){const min=questions.map(q=>{const values=q.options.map(o=>o.scores[axis]??0);return values.indexOf(Math.min(...values));});const max=questions.map(q=>{const values=q.options.map(o=>o.scores[axis]??0);return values.indexOf(Math.max(...values));});expect(calculateTraits(min)[axis]).toBe(0);expect(calculateTraits(max)[axis]).toBe(100);}});
 it("rejects incomplete and malformed answers",()=>{for(const bad of [[],Array(11).fill(0),[...Array(11).fill(0),4],Array(12).fill(.5),Array(12).fill(-1),Array(12).fill(NaN)])expect(()=>calculateTraits(bad)).toThrow();});
});
describe("verified curated universe",()=>{
 it("has exactly 106 unique stocks split 50/56 with no ticker duplication",()=>{expect(stocks).toHaveLength(106);expect(stocks.filter(s=>s.market==="SP500")).toHaveLength(50);expect(stocks.filter(s=>s.market==="KOSPI")).toHaveLength(56);expect(new Set(stocks.map(s=>s.id)).size).toBe(106);expect(new Set(stocks.map(s=>s.ticker)).size).toBe(106);expect(new Set(stocks.map(s=>s.personalityTitle)).size).toBe(106);});
 it("matches all 106 tickers to the preserved primary-source snapshots",()=>{expect(usMembership).toHaveLength(50);expect(krMembership).toHaveLength(56);for(const stock of stocks){const snapshot=stock.market==="SP500"?usMembership:krMembership;expect(snapshot.some(row=>row.ticker===stock.ticker)).toBe(true);expect(stock.membershipVerified).toBe(true);expect(stock.dataAsOf).toMatch(/^2026-10-(22|25)$/);if(stock.market==="KOSPI")expect(stock.ticker).toMatch(/^\d{6}$/);}});
 it("has valid editorial vectors, strengths, weaknesses and resolvable sources",()=>{const ids=new Set(sources.map(s=>s.id));for(const stock of stocks){expect(isTraits(stock.traits)).toBe(true);expect(stock.strengths).toHaveLength(2);expect(stock.weaknesses).toHaveLength(2);expect(stock.profileBasis.length).toBeGreaterThanOrEqual(2);for(const source of stock.sourceIds)expect(ids.has(source)).toBe(true);}});
});
describe("deterministic matching",()=>{
 it("returns identical rankings for identical answers",()=>{const answers=[0,1,2,3,0,1,2,3,0,1,2,3];expect(rankStocks(calculateTraits(answers),stocks)).toEqual(rankStocks(calculateTraits(answers),stocks));});
 it("finds every stock at its exact vector and yields three aligned axes",()=>{for(const stock of stocks){const ranked=rankStocks(stock.traits,stocks);expect(ranked[0].stock.id).toBe(stock.id);expect(ranked[0].similarity).toBe(100);expect(ranked[0].alignedAxes).toHaveLength(3);}});
 it("handles all 64 six-axis extremes without invalid scores",()=>{for(let i=0;i<64;i++){const scores=Object.fromEntries(axisKeys.map((axis,j)=>[axis,(i>>j)&1?100:0]));const result=rankStocks(scores as never,stocks);expect(result).toHaveLength(106);expect(result[0].similarity).toBeGreaterThanOrEqual(0);expect(result[0].similarity).toBeLessThanOrEqual(100);}});
 it("defines symmetric normalized distance",()=>{const a=stocks[0].traits,b=stocks[1].traits;expect(traitDistance(a,b)).toBe(traitDistance(b,a));expect(traitDistance(a,a)).toBe(0);});
 it("rejects invalid vectors and empty universes",()=>{expect(()=>rankStocks({} as never,stocks)).toThrow();expect(()=>rankStocks(stocks[0].traits,[])).toThrow();expect(isTraits({...stocks[0].traits,vision:101})).toBe(false);});
 it("public URLs carry only the character ID and reject unknown IDs",()=>{for(const stock of stocks){expect(getStock(stock.id)).toBe(stock);expect(new URL(resultPath(stock.id),"https://example.com").search).toBe("");}for(const id of [undefined,"__proto__","nvda",["us-nvda"],"missing"])expect(getStock(id)).toBeUndefined();});
});
