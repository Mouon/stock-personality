import type { StockPersonality } from "@/types/personality";
import { resultPath } from "./stocks";
export type EventType="share_attempt"|"share_completed"|"link_copied"|"shared_link_visit";
export async function trackEvent(type:EventType,stockId:string,interactionId?:string) {try{await fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type,stockId,eventId:crypto.randomUUID(),interactionId}),keepalive:true,signal:AbortSignal.timeout(2500)});}catch{/* Sharing works independently of analytics. */}}
export function shareText(stock:StockPersonality){return `나는 ${stock.name}형 인간이래.\n“${stock.personalityTitle}”\n\n너는 무슨 주식이야? #너라는종목`;}
export async function copyLink(stockId:string){
  const url=new URL(resultPath(stockId),location.origin).href;
  if(navigator.clipboard?.writeText){
    let timer:number|undefined;
    try{
      await Promise.race([navigator.clipboard.writeText(url),new Promise<never>((_,reject)=>{timer=window.setTimeout(()=>reject(new Error("Clipboard unavailable")),1800);})]);
      return;
    }catch{/* Permission prompts must not leave the copy action waiting indefinitely. */}
    finally{if(timer!==undefined)window.clearTimeout(timer);}
  }
  const el=document.createElement("textarea");el.value=url;el.style.position="fixed";el.style.opacity="0";document.body.appendChild(el);el.select();
  const copied=document.execCommand("copy");el.remove();if(!copied)throw new Error("아래 링크를 직접 복사해주세요.");
}
