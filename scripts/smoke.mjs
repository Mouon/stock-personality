import assert from "node:assert/strict";
import {readFile,writeFile} from "node:fs/promises";
const base=process.env.SMOKE_BASE_URL||"http://127.0.0.1:3017";
const assets=JSON.parse(await readFile(new URL("../src/data/market-links.json",import.meta.url),"utf8"));
const stocks=JSON.parse(await readFile(new URL("../src/data/stocks.json",import.meta.url),"utf8"));
let checks=0;
for(const path of ["/","/quiz","/about"]){const response=await fetch(base+path);assert.equal(response.status,200,path);assert.match(await response.text(),/너라는 종목/);checks++;}
for(let start=0;start<stocks.length;start+=10){await Promise.all(stocks.slice(start,start+10).map(async stock=>{const response=await fetch(`${base}/result/${stock.id}`,{headers:{"User-Agent":"Twitterbot"}});assert.equal(response.status,200,stock.id);const html=await response.text();const plain=html.replaceAll("&amp;","&").replaceAll("&#x27;",String.fromCharCode(39)).replaceAll("&#39;",String.fromCharCode(39)).replaceAll("&quot;",String.fromCharCode(34));assert.ok(plain.includes(stock.name),stock.name);assert.ok(html.includes("og:image"));assert.ok(html.includes(assets[stock.id].tossUrl));assert.ok(html.includes(assets[stock.id].logoPath));assert.ok(html.includes(`/api/card?id=${stock.id}`));checks++;}));}
for(const id of [null,"us-nvda","kr-005930","us-brk-b"]){const response=await fetch(`${base}/api/card?${id?`id=${id}&`:""}download=1`);assert.equal(response.status,200,id);assert.match(response.headers.get("content-type"),/image\/png/);assert.match(response.headers.get("content-disposition"),/attachment/);const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a");checks++;}
assert.equal((await fetch(`${base}/result/not-a-stock`)).status,404);checks++;
assert.equal((await fetch(`${base}/api/card?id=not-a-stock`)).status,400);checks++;
assert.equal((await fetch(`${base}/api/stats`)).status,401);checks++;
assert.equal((await fetch(`${base}/api/events`,{method:"POST",headers:{origin:base,"content-type":"application/json"},body:'{"type":"invalid"}'})).status,400);checks++;
assert.equal((await fetch(`${base}/api/events`,{method:"POST",headers:{origin:"https://attacker.example","content-type":"application/json"},body:"{}"})).status,403);checks++;
const path=`${base}/result/us-nvda`;const refreshA=await(await fetch(path)).text();const refreshB=await(await fetch(path)).text();assert.ok(refreshA.includes("NVIDIA")&&refreshB.includes("NVIDIA"));assert.ok(refreshB.includes("이 종목을 사람으로 말하자면"));checks++;
const report={base,checks,status:"passed",note:"HTTP checks cover all106 result routes, metadata, PNGs, invalid URLs and API validation. Actual browser flow is checked separately."};
if(process.env.WRITE_SMOKE_REPORT==="1")await writeFile(new URL("../docs/smoke-report.json",import.meta.url),JSON.stringify(report,null,2)+"\n");
console.log(`HTTP smoke: ${checks} passed (${base})`);
