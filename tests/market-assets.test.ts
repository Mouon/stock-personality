import {describe,it,expect} from "vitest";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {stocks} from "@/lib/stocks";
import {getMarketAsset,getTossLink,marketAssets} from "@/lib/market-links";
import usEvidence from "../docs/data/market-assets-us.json";
import krEvidence from "../docs/data/market-assets-kr.json";
describe("verified price links and corporate identification icons",()=>{
 it("routes all 106 mobile app links and web fallbacks to the same verified stock",()=>{
  for(const stock of stocks){
   const asset=getMarketAsset(stock.id);
   const code=new URL(asset.tossUrl).pathname.split("/")[2];
   const link=new URL(getTossLink(stock.id));
   expect(link.origin+link.pathname).toBe("https://toss.onelink.me/3563614660");
   expect(link.searchParams.get("af_web_dp")).toBe(asset.tossUrl);
   expect(link.searchParams.get("af_force_deeplink")).toBe("true");
   const scheme=new URL(link.searchParams.get("af_dp")!);
   expect(scheme.protocol).toBe("supertoss:");expect(scheme.hostname).toBe("securities");
   const mobile=new URL(scheme.searchParams.get("url")!);
   expect(mobile.origin).toBe("https://service.tossinvest.com");
   expect(mobile.searchParams.get("nextLandingUrl")).toBe(`/stocks/${code}`);
   for(const fallback of ["af_ios_url","af_android_url"]){
    expect(link.searchParams.get(fallback)).toBe(`https://contents.tossinvest.com/stocks/${code}`);
   }
  }
 });
 it("opens the securities home from the landing page or an unknown stock",()=>{
  for(const id of [undefined,"unknown"]){
   const link=new URL(getTossLink(id));
   expect(link.searchParams.get("af_web_dp")).toBe("https://www.tossinvest.com/");
   const scheme=new URL(link.searchParams.get("af_dp")!);
   expect(scheme.hostname).toBe("securities");
   const mobile=new URL(scheme.searchParams.get("url")!);
   expect(mobile.origin).toBe("https://service.tossinvest.com");
   expect(mobile.searchParams.has("nextLandingUrl")).toBe(false);
  }
 });
 it("has a verified first-party Toss URL for all 106 exact stock identities",()=>{
  expect(Object.keys(marketAssets)).toHaveLength(106);
  for(const stock of stocks){const asset=getMarketAsset(stock.id);expect(asset.stockId).toBe(stock.id);expect(asset.ticker).toBe(stock.ticker);const url=new URL(asset.tossUrl);expect(url.origin).toBe("https://www.tossinvest.com");expect(url.pathname).toMatch(/^\/stocks\/[A-Z0-9]+\/order$/);expect(url.search).toBe("");const evidence=stock.market==="KOSPI"?krEvidence.find(e=>e.stockId===stock.id):usEvidence.find(e=>e.stockId===stock.id);expect(evidence?.verified).toBe(true);expect(evidence?.tossUrl).toBe(asset.tossUrl);expect(new URL(asset.verificationSource).hostname).toBe("wts-info-api.tossinvest.com");}
 });
 it("ships valid local PNGs with original asset provenance",()=>{
  for(const stock of stocks){const asset=getMarketAsset(stock.id);expect(asset.logoPath).toBe(`/company-icons/${stock.id}.png`);expect(new URL(asset.logoSourceUrl!).hostname).toBe("static.toss.im");const bytes=readFileSync(join(process.cwd(),"public",asset.logoPath!));expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");expect(bytes.length).toBeGreaterThan(100);}
 });
});
