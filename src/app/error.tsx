"use client";
import Link from "next/link";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="empty-scene"><span className="eyebrow">LET’S START FRESH.</span><h1>잠깐, 거래 대신<br/>숨 고르기.</h1><p>화면을 불러오지 못했어요. 다시 시도해주세요.</p><button onClick={reset} className="button primary">다시 시도하기</button><Link href="/" className="text-button">처음으로</Link></section>;}
