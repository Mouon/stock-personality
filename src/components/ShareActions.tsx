"use client";
import { useEffect,useState } from "react";
import { Check,Download,Share2 } from "lucide-react";
import type { StockPersonality } from "@/types/personality";
import {copyLink,shareText,trackEvent} from "@/lib/sharing";
import {resultPath} from "@/lib/stocks";
export function ShareActions({stock,own}:{stock:StockPersonality;own:boolean}) {
 const [busy,setBusy]=useState(false);const [notice,setNotice]=useState("");const [manual,setManual]=useState("");
 useEffect(()=>{if(own)return;try{const key=`human-equity:visit:${stock.id}`;if(sessionStorage.getItem(key))return;sessionStorage.setItem(key,"1");}catch{return;}void trackEvent("shared_link_visit",stock.id);},[stock.id,own]);
 async function share(){if(busy)return;setBusy(true);setNotice("");setManual("");const interactionId=crypto.randomUUID();const attempt=trackEvent("share_attempt",stock.id,interactionId);try{if(navigator.share){try{await navigator.share({title:"너라는 종목",text:shareText(stock),url:new URL(resultPath(stock.id),location.origin).href});await attempt;void trackEvent("share_completed",stock.id,interactionId);setNotice("당신의 의외의 닮은꼴을 공유했어요.");return;}catch(error){if(error instanceof Error&&error.name==="AbortError")return;}}await copyLink(stock.id);await attempt;void trackEvent("link_copied",stock.id,interactionId);setNotice("링크를 복사했어요. 친구의 종목도 물어보세요.");}catch(error){setNotice(error instanceof Error?error.message:"링크를 직접 복사해주세요.");setManual(new URL(resultPath(stock.id),location.origin).href);}finally{setBusy(false);}}
 async function copyOnly(){const interactionId=crypto.randomUUID();const attempt=trackEvent("share_attempt",stock.id,interactionId);try{await copyLink(stock.id);await attempt;void trackEvent("link_copied",stock.id,interactionId);setNotice("링크를 복사했어요. 친구의 종목도 물어보세요.");setManual("");}catch{setNotice("아래 링크를 직접 복사해주세요.");setManual(new URL(resultPath(stock.id),location.origin).href);}}
 return <div className="share-actions"><button className="button primary" onClick={share} disabled={busy}>{notice.startsWith("링크를 복사")?<Check size={17}/>:<Share2 size={17}/>}친구에게 공유하기</button><a className="button secondary" href={`/api/card?id=${stock.id}&download=1`} download={`human-equity-${stock.id}.png`}><Download size={17}/>카드 저장</a><button className="copy-only text-button" onClick={copyOnly}>링크만 복사</button>{notice&&<p role="status">{notice}</p>}{manual&&<input aria-label="직접 복사할 공유 링크" readOnly value={manual} onFocus={event=>event.target.select()}/>}</div>;
}
