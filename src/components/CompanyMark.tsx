"use client";
import Image from "next/image";
import {useState} from "react";
import {getMarketAsset} from "@/lib/market-links";
export function CompanyMark({id,name,ticker,small=false}:{id:string;name:string;ticker:string;small?:boolean}) {
  const [failed,setFailed]=useState(false);const asset=getMarketAsset(id);
  return <span className={`company-mark ${small?"small":""}`} title={`${name} 기업 식별 아이콘`} aria-hidden="true">{asset?.logoPath&&!failed?<Image src={asset.logoPath} alt="" width={small?25:44} height={small?25:44} unoptimized onError={()=>setFailed(true)}/>:<span className="company-initials">{ticker.slice(0,2)}</span>}</span>;
}
