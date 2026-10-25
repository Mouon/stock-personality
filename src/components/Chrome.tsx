"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Header() { return <header className="site-header"><Link href="/" className="brand" aria-label="너라는 종목 홈"><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>너라는 종목<span className="brand-en">HUMAN EQUITY</span></Link><Link className="about-link" href="/about">이 테스트는요 <ArrowUpRight size={13}/></Link></header>; }
export function Footer() { return <footer className="site-footer"><span>사람은 종목보다 입체적이니까.</span><span>재미로 보는 성격 매칭 · 투자 권유가 아닙니다.</span><span className="footer-edition">VOL. 01 / 2026</span></footer>; }
