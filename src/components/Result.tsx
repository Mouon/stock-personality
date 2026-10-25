"use client";
import Link from "next/link";
import { ArrowRight,ArrowUpRight,Plus,Minus,RotateCcw } from "lucide-react";
import type { StockPersonality } from "@/types/personality";
import { useAnalysis } from "./AnalysisProvider";
import { alignedAxes,personalExplanation,rankStocks } from "@/lib/matching";
import { axes } from "@/data/axes";
import { resultPath,stocks } from "@/lib/stocks";
import { TraitBars } from "./TraitBars";
import { ShareActions } from "./ShareActions";
import { Compare } from "./Compare";
import {CampaignPanel} from "./CampaignPanel";
import { CompanyMark } from "./CompanyMark";
import { getMarketAsset } from "@/lib/market-links";
export function Result({stock}:{stock:StockPersonality}) {
 const {analysis,setAnalysis}=useAnalysis();const own=analysis?.matches[0].stock.id===stock.id;const match=own?analysis!.matches[0]:null;
 const related=own?analysis!.matches.slice(1):rankStocks(stock.traits,stocks).filter(item=>item.stock.id!==stock.id).slice(0,2);
 const marketAsset=getMarketAsset(stock.id);
 const scores=own?analysis!.scores:stock.traits;const aligned=match?.alignedAxes??alignedAxes(stock.traits,stock.traits);
 return <article className="result scene-in"><div className="result-kicker"><span className="eyebrow">YOUR HUMAN EQUITY</span><span className="market-label">{stock.market==="SP500"?"S&P 500":"KOSPI"} · {stock.ticker}</span></div><div className="result-hero"><CompanyMark id={stock.id} name={stock.name} ticker={stock.ticker}/><p className="result-intro">{own?"당신과 가장 닮은 주식은":"이 종목을 사람으로 말하자면"}</p><h1 data-long-name={stock.name.length>14||(/[가-힣]/.test(stock.name)&&stock.name.length>7)}>{stock.name}</h1><h2>“{stock.personalityTitle}”</h2><p className="one-liner">{stock.oneLiner}</p><div className="result-tags">{aligned.map(axis=><span key={axis}>{stock.traits[axis]>=50?axes[axis].high:axes[axis].low}</span>)}</div>{marketAsset&&<a className="price-link" href={marketAsset.tossUrl} target="_blank" rel="noopener noreferrer">토스증권에서 현재가 보기 <ArrowUpRight size={14}/></a>}</div>
 <div className="result-divider"><span>NOT A STOCK TIP. A LITTLE SELF-DISCOVERY.</span><span>↗</span></div>
 {!own&&<div className="shared-note"><p>친구는 이 종목이 나왔대요.<br/>당신의 의외의 닮은꼴도 찾아보세요.</p><Link href="/quiz" className="text-button">나도 내 종목 찾기 <ArrowRight size={15}/></Link></div>}
 <CampaignPanel stockId={stock.id}/><div className="analysis-grid"><section className="analysis-copy"><span className="section-index">01 / THE RESEMBLANCE</span><h3>{own?"당신이 이 주식과 닮은 이유":"이 캐릭터는 이런 사람이에요"}</h3><div className="description">{own?personalExplanation(scores,match!).map((line,i)=><p key={i}>{line}</p>):<p>{stock.description}</p>}</div><div className="basis-note"><span>비유의 출발점</span><p>{stock.profileBasis.join(" · ")}</p></div></section>
 <section className="trait-section"><div className="trait-section-heading"><div><span className="section-index">02 / PERSONALITY PROFILE</span><h3>{own?"당신의 성격":"이 캐릭터의 성향"}</h3></div>{match&&<div className="match-score"><strong>{match.similarity}<small>%</small></strong><span>닮은 정도</span></div>}</div><TraitBars scores={scores}/><p className="model-note">재미로 보는 성격 비유예요. 실제 투자 적합성을 뜻하지 않아요.</p></section></div>
 <section className="strengths-section"><div><span className="section-index">03 / TWO SIDES OF YOU</span><h3>그래서 더, 당신 같아요.</h3></div><div className="strengths-columns"><div><h4><Plus size={14}/> 이런 점이 매력</h4>{stock.strengths.map(item=><p key={item}>{item}</p>)}</div><div><h4><Minus size={14}/> 가끔은 이럴지도</h4>{stock.weaknesses.map(item=><p key={item}>{item}</p>)}</div></div></section>
 <section className="related-section"><span className="section-index">04 / SAME ENERGY, DIFFERENT TICKER</span><h3>{own?"당신과 닮은 다른 주식":"이 캐릭터와 결이 비슷한 종목"}</h3><div className="related-list">{related.map(item=><Link key={item.stock.id} href={resultPath(item.stock.id)} className="related-stock"><CompanyMark id={item.stock.id} name={item.stock.name} ticker={item.stock.ticker} small/><div><strong>{item.stock.name}</strong><span>{item.stock.personalityTitle}</span></div>{own&&<span className="related-score">{item.similarity}%</span>}<ArrowUpRight size={17}/></Link>)}</div></section>
 <Compare stock={stock}/><section className="result-share"><span className="eyebrow">GOOD CHARACTERS DESERVE GOOD COMPANY.</span><h3>“너는 무슨 주식이야?”</h3><p>친구의 의외의 닮은꼴도 궁금해지니까.</p><ShareActions stock={stock} own={own}/><Link href="/quiz" className="text-button retest" onClick={()=>setAnalysis(null)}><RotateCcw size={14}/>{own?"다시 테스트하기":"나와 닮은 주식 찾기"}</Link></section><div className="data-note"><span>캐릭터 데이터 기준 {stock.dataAsOf} · {stock.sector}</span><Link href="/about#data">이 테스트는요 <ArrowUpRight size={11}/></Link></div></article>;
}
