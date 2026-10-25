"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { questions } from "@/data/questions";
import { calculateTraits, rankStocks } from "@/lib/matching";
import { stocks, resultPath } from "@/lib/stocks";
import { useAnalysis } from "./AnalysisProvider";
export function Quiz() {
  const [index,setIndex] = useState(0); const [answers,setAnswers] = useState<number[]>([]); const [busy,setBusy] = useState(false); const [revealing,setRevealing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null); const heading = useRef<HTMLHeadingElement>(null); const router = useRouter(); const {setAnalysis} = useAnalysis();
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  useEffect(()=>{heading.current?.focus();},[index]);
  function answer(choice:number) {
    if(busy) return; setBusy(true); const next = [...answers]; next[index]=choice; setAnswers(next);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current=setTimeout(()=>{
      if(index<questions.length-1){setIndex(index+1);setBusy(false);}
      else {
        const scores=calculateTraits(next); const matches=rankStocks(scores,stocks); setAnalysis({scores,matches:matches.slice(0,3)}); setRevealing(true);
        // Only the public character ID goes into the URL. Answers stay in memory.
        timer.current=setTimeout(()=>router.push(resultPath(matches[0].stock.id)),reduced?150:2200);
      }
    },reduced?0:160);
  }
  function back() { if(busy||index===0)return;setIndex(index-1); }
  const question=questions[index];
  if(revealing) return <section className="reveal-scene scene-in" aria-live="polite" aria-busy="true"><span className="eyebrow">IDENTIFYING YOUR HUMAN EQUITY</span><div className="scanning-symbol" aria-hidden="true"><span>YOU</span><i/><b>↗</b></div><h1>당신이라는 종목,<br/>상장 준비 중.</h1><p>12개의 선택에서, 당신만의 결을 찾고 있어요.</p><div className="loading-track"><i/></div><span className="reveal-foot">가격표 대신 성격표를 붙이는 중입니다.</span></section>;
  return <section className="quiz-scene" aria-labelledby="question-title"><div className="quiz-top"><button className="text-button" onClick={back} disabled={index===0||busy}><ArrowLeft size={14}/> 이전 질문</button><span className="question-count"><strong>{String(index+1).padStart(2,"0")}</strong> / 12</span></div><div className="quiz-progress" role="progressbar" aria-label="테스트 진행률" aria-valuenow={index+1} aria-valuemin={0} aria-valuemax={12}><i style={{width:`${(index+1)/12*100}%`}}/></div><div className="question-body scene-in" key={question.id}><span className="eyebrow">Q{String(index+1).padStart(2,"0")} — {question.context}</span><h1 id="question-title" ref={heading} tabIndex={-1}>{question.title}</h1><p className="question-hint">정답은 없어요. 가장 나다운 답 하나.</p><div className="answer-list">{question.options.map((option,choice)=><button key={choice} onClick={()=>answer(choice)} disabled={busy} className={`answer-option ${answers[index]===choice?"selected":""}`} aria-pressed={answers[index]===choice}><span className="answer-letter">{String.fromCharCode(65+choice)}</span><span>{option.label}</span>{answers[index]===choice?<Check size={16}/>:<ArrowRight size={16}/>}</button>)}</div></div></section>;
}
