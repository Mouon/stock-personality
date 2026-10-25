import {ArrowUpRight} from "lucide-react";
import campaigns from "@/data/campaigns.json";
export function CampaignPanel({stockId}:{stockId:string}) {
 const campaign=campaigns.find(item=>item.stockId===stockId);if(!campaign)return null;
 return <aside className="campaign-panel" aria-label={`${campaign.companyName} 주주 캠페인`}><div><span className="eyebrow">ANOTHER SIDE OF THE COMPANY</span><h3>이 회사의 주주 이야기도 궁금하다면.</h3><p>비사이드코리아에서 공개한 캠페인을 살펴보세요.</p></div><a href={campaign.url} target="_blank" rel="noopener noreferrer">비사이드코리아 캠페인 보기 <ArrowUpRight size={15}/></a></aside>;
}
