import {it,expect} from "vitest";
import {writeFileSync} from "node:fs";
import {stocks} from "@/lib/stocks";
import {calculateTraits,rankStocks} from "@/lib/matching";
it("audits seeded answer cohorts for excessive recommendation concentration",()=>{
 let state=20261025;const random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
 const count:Record<string,number>={};const sampleSize=12000;
 for(let i=0;i<sampleSize;i++){const answers=Array.from({length:12},()=>Math.floor(random()*4));const winner=rankStocks(calculateTraits(answers),stocks)[0].stock.id;count[winner]=(count[winner]??0)+1;}
 const ranked=Object.entries(count).sort((a,b)=>b[1]-a[1]);const topShare=ranked[0][1]/sampleSize;const report={seed:20261025,sampleSize,distinctResults:ranked.length,topShare,marketCounts:{SP500:0,KOSPI:0},frequencies:ranked.map(([id,count])=>({id,name:stocks.find(s=>s.id===id)!.name,count,share:count/sampleSize}))};
 for(const [id,value] of ranked)report.marketCounts[stocks.find(s=>s.id===id)!.market]+=value;
 console.log(JSON.stringify({sampleSize,distinct:ranked.length,topShare,top5:report.frequencies.slice(0,5),markets:report.marketCounts},null,2));
 if(process.env.WRITE_MATCH_AUDIT==="1")writeFileSync("docs/matching-audit.json",JSON.stringify(report,null,2)+"\n");
 expect(ranked.length).toBeGreaterThanOrEqual(90);expect(topShare).toBeLessThan(.08);
},30000);
