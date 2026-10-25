import type { Axis } from "@/types/personality";
export const axes: Record<Axis, { label: string; low: string; high: string; weight: number; detail: string }> = {
  volatility: { label: "감정의 진폭", low: "잔잔한", high: "표현이 큰", weight: .9, detail: "기분을 차분히 다루는지, 생생하게 드러내는지" },
  vision: { label: "미래지향성", low: "현재 중심", high: "미래 중심", weight: 1, detail: "지금의 확실함과 미래의 가능성 중 마음이 향하는 쪽" },
  stability: { label: "안정성 선호", low: "모험 선호", high: "안정 선호", weight: 1, detail: "변화를 반기는지, 익숙한 일상의 안정감을 좋아하는지" },
  independence: { label: "독립성", low: "조화 중심", high: "자기 기준", weight: .9, detail: "주변과 조율하는지, 자기만의 방식으로 결정하는지" },
  momentum: { label: "추진력", low: "생각 먼저", high: "행동 먼저", weight: 1, detail: "차근차근 검토하는지, 일단 시도하면서 배우는지" },
  unpredictability: { label: "즉흥성", low: "계획적인", high: "즉흥적인", weight: .9, detail: "예정대로 움직이는지, 뜻밖의 선택을 즐기는지" },
};
export const axisModelNote = "변동성·미래지향성·안정성 선호·독립성·추진력·예측 불가능성을 일상 언어로 바꾼 재미용 모델입니다. 심리검사나 실제 주가 지표가 아닙니다.";
