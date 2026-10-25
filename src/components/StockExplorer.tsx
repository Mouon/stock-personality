"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { searchStocks, type MarketFilter } from "@/lib/stock-search";
import { resultPath } from "@/lib/stocks";
import { CompanyMark } from "./CompanyMark";

const filters: { value: MarketFilter; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "KOSPI", label: "한국" },
  { value: "SP500", label: "미국" },
];

export function StockExplorer({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [market, setMarket] = useState<MarketFilter>("ALL");
  const matches = searchStocks(query, market);
  const visible = compact ? matches.slice(0, 6) : matches;

  return <div className="stock-explorer">
    <label htmlFor={inputId} className="explorer-search-label">궁금한 종목을 찾아보세요.</label>
    <div className="explorer-search">
      <Search size={18} aria-hidden="true"/>
      <input id={inputId} type="search" autoComplete="off" placeholder="현대차, 엔비디아, AAPL…" value={query} onChange={event => setQuery(event.target.value)} aria-describedby={`${inputId}-count`}/>
    </div>
    <div className="explorer-toolbar">
      <div className="explorer-filters" role="group" aria-label="시장 선택">
        {filters.map(filter => <button type="button" key={filter.value} aria-pressed={market === filter.value} onClick={() => setMarket(filter.value)}>{filter.label}</button>)}
      </div>
      <p id={`${inputId}-count`} role="status">{matches.length}개 캐릭터{compact && matches.length > 6 ? " 중 6개" : ""}</p>
    </div>
    {visible.length ? <ul className="explorer-grid">
      {visible.map(stock => <li key={stock.id}>
        <Link href={resultPath(stock.id)} className="explorer-card" prefetch={false}>
          <div className="explorer-card-top">
            <CompanyMark id={stock.id} name={stock.name} ticker={stock.ticker} small/>
            <div><strong>{stock.name}</strong><span>{stock.market === "KOSPI" ? "KOSPI" : "S&P 500"} · {stock.ticker}</span></div>
            <ArrowUpRight size={18} aria-hidden="true"/>
          </div>
          <p className="explorer-character">“{stock.personalityTitle}”</p>
          <p className="explorer-one-liner">{stock.oneLiner}</p>
          <span className="explorer-detail">이 캐릭터 더 알아보기 <ArrowUpRight size={13} aria-hidden="true"/></span>
        </Link>
      </li>)}
    </ul> : <div className="explorer-empty"><p>아직 상장 안 된 취향인가 봐요.</p><span>다른 종목명이나 티커로 찾아보세요.</span><button type="button" className="text-button" onClick={() => {setQuery("");setMarket("ALL");}}>전체 종목 다시 보기</button></div>}
    {compact && <Link href="/result" className="text-button explorer-all">106개 캐릭터 전부 구경하기 <ArrowUpRight size={14}/></Link>}
  </div>;
}
