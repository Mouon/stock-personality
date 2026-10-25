"use client";
import { useState } from "react";
import { ArrowDown, Users } from "lucide-react";
import { stocks } from "@/lib/stocks";
import { traitDistance } from "@/lib/matching";
import type { StockPersonality } from "@/types/personality";
import { TraitBars } from "./TraitBars";
export function Compare({stock}:{stock:StockPersonality}) {
  const [open,setOpen]=useState(false);const [search,setSearch]=useState("");const [id,setId]=useState("");const other=stocks.find(item=>item.id===id);const filtered=stocks.filter(item=>`${item.name} ${item.ticker}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <section className="compare-section"><button className="compare-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="friend-comparison"><span><Users size={17}/>친구는 무슨 종목이래?</span><ArrowDown size={16} className={open?"rotated":""}/></button>{open&&<div id="friend-comparison" className="compare-body scene-in"><label htmlFor="friend-stock">친구가 받은 종목을 골라보세요.</label><input className="stock-search" type="search" aria-label="종목명 또는 티커 검색" placeholder="종목명 또는 티커로 검색" value={search} onChange={event=>{setSearch(event.target.value);setId("");}}/><select id="friend-stock" value={id} onChange={event=>setId(event.target.value)}><option value="">친구의 종목 선택</option>{["KOSPI","SP500"].map(market=><optgroup label={market==="KOSPI"?"한국 KOSPI":"미국 S&P 500"} key={market}>{filtered.filter(item=>item.market===market&&item.id!==stock.id).map(item=><option key={item.id} value={item.id}>{item.name} · {item.ticker}</option>)}</optgroup>)}</select>{other&&<><div className="compare-summary"><strong>{stock.name} <span>×</span> {other.name}</strong><p>두 캐릭터의 성향 닮음 <b>{Math.round(100-traitDistance(stock.traits,other.traits))}%</b></p><span>궁합이나 투자 적합성이 아닌, 공개 캐릭터 점수의 비교예요.</span></div><TraitBars scores={stock.traits} compare={other.traits} compareLabel={other.name}/></>}</div>}</section>;
}
