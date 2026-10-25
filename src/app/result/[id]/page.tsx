import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getStock,resultPath} from "@/lib/stocks";
import {Result} from "@/components/Result";
type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const stock=getStock(id);if(!stock)return{title:"아직 만나지 못한 종목",robots:{index:false}};const title=`${stock.name}형 인간 — ${stock.personalityTitle}`;const description=`${stock.oneLiner} 너는 무슨 주식이야?`;const image=`/api/card?id=${stock.id}`;return{title,description,alternates:{canonical:resultPath(id)},openGraph:{title:`${title} | 너라는 종목`,description,type:"website",siteName:"너라는 종목",locale:"ko_KR",url:resultPath(id),images:[{url:image,width:1200,height:630,alt:title}]},twitter:{card:"summary_large_image",title,description,images:[image]}};}
export default async function ResultPage({params}:Props){const {id}=await params;const stock=getStock(id);if(!stock)notFound();return <Result key={id} stock={stock}/>;}
