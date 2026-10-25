import {describe,it,expect} from "vitest";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {stocks} from "@/lib/stocks";
import {getMarketAsset,marketAssets} from "@/lib/market-links";
import usEvidence from "../docs/data/market-assets-us.json";
import krEvidence from "../docs/data/market-assets-kr.json";
describe("verified price links and corporate identification icons",()=>{
 it("has a verified first-party Toss URL for all 106 exact stock identities",()=>{
  expect(Object.keys(marketAssets)).toHaveLength(106);
  for(const stock of stocks){const asset=getMarketAsset(stock.id);expect(asset.stockId).toBe(stock.id);expect(asset.ticker).toBe(stock.ticker);const url=new URL(asset.tossUrl);expect(url.origin).toBe("https://www.tossinvest.com");expect(url.pathname).toMatch(/^\/stocks\/[A-Z0-9]+\/order$/);expect(url.search).toBe("");const evidence=stock.market==="KOSPI"?krEvidence.find(e=>e.stockId===stock.id):usEvidence.find(e=>e.stockId===stock.id);expect(evidence?.verified).toBe(true);expect(evidence?.tossUrl).toBe(asset.tossUrl);expect(new URL(asset.verificationSource).hostname).toBe("wts-info-api.tossinvest.com");}
 });
 it("ships valid local PNGs with original asset provenance",()=>{
  for(const stock of stocks){const asset=getMarketAsset(stock.id);expect(asset.logoPath).toBe(`/company-icons/${stock.id}.png`);expect(new URL(asset.logoSourceUrl!).hostname).toBe("static.toss.im");const bytes=readFileSync(join(process.cwd(),"public",asset.logoPath!));expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");expect(bytes.length).toBeGreaterThan(100);}
 });
});
