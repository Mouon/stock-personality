import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StockExplorer } from "@/components/StockExplorer";

export const metadata: Metadata = {
  title: "종목 구경 — 이 주식, 사람으로 치면?",
  description: "106개 종목의 의외의 성격을 구경하세요. 종목명이나 티커로 검색하고 캐릭터 설명을 읽어보세요.",
  alternates: { canonical: "/result" },
};

export default function StockDirectoryPage() {
  return <article className="stock-directory scene-in">
    <header className="directory-heading"><span className="eyebrow">106 CHARACTERS. SOMEONE YOU KNOW.</span><h1>이 주식,<br/>사람으로 치면?</h1><p>내 닮은꼴만 보고 가기엔,<br/>남의 성격 구경이 제일 재밌으니까.</p><Link href="/quiz" className="text-button">그래서 나는 무슨 종목인데? <ArrowRight size={14}/></Link></header>
    <StockExplorer/>
    <p className="directory-note">재미로 만든 성격 캐릭터예요. 투자 권유나 실제 투자 적합성을 뜻하지 않아요.</p>
  </article>;
}
