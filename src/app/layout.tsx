import type {Metadata,Viewport} from "next";
import {universe} from "@/data/universe";
import {VisitsProvider} from "@/components/Visits";
import {AnalysisProvider} from "@/components/AnalysisProvider";
import {Header,Footer} from "@/components/Chrome";
import {siteUrl} from "@/lib/site";
import "./globals.css";
export const metadata:Metadata={metadataBase:siteUrl(),title:{default:"너라는 종목 — 내 성격이 상장된다면?",template:"%s | 너라는 종목"},description:`12개의 질문, ${universe.total}개의 종목. 주식 몰라도 괜찮아요. 당신과 의외로 닮은 주식 캐릭터를 찾아보세요.`,openGraph:{type:"website",locale:"ko_KR",siteName:"너라는 종목",title:"내 성격이 상장된다면?",description:"나는 무슨 주식형 인간일까? 2분 만에 찾는 의외의 닮은꼴.",images:[{url:"/api/card",width:1200,height:630,alt:"너라는 종목 — 나와 닮은 주식 찾기"}]},twitter:{card:"summary_large_image",title:"너라는 종목",images:["/api/card"]},icons:{icon:"/icon.svg"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#ffffff"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ko" data-scroll-behavior="smooth"><body><a href="#main-content" className="skip-link">본문으로 건너뛰기</a><VisitsProvider><AnalysisProvider><div className="site-shell"><Header/><main id="main-content">{children}</main><Footer/></div></AnalysisProvider></VisitsProvider></body></html>;}
