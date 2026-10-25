import { axisKeys, type Axis, type Traits, type StockPersonality, type StockMatch } from "@/types/personality";
import { axes } from "@/data/axes";
import { questions } from "@/data/questions";
export function isTraits(value: unknown): value is Traits {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string,unknown>;
  return Object.keys(v).length === 6 && axisKeys.every(key => typeof v[key] === "number" && Number.isFinite(v[key]) && v[key] >= 0 && v[key] <= 100);
}
export function calculateTraits(answers: readonly number[]): Traits {
  if (answers.length !== questions.length || answers.some(answer => !Number.isInteger(answer) || answer < 0 || answer > 3)) throw new Error("12개 질문에 모두 답해주세요.");
  return Object.fromEntries(axisKeys.map(axis => {
    let total = 0; let min = 0; let max = 0;
    questions.forEach((question, index) => {
      total += question.options[answers[index]].scores[axis] ?? 0;
      const possible = question.options.map(option => option.scores[axis] ?? 0);
      min += Math.min(...possible); max += Math.max(...possible);
    });
    return [axis, max === min ? 50 : Math.round(Math.min(100, Math.max(0, (total - min) / (max - min) * 100)))];
  })) as Traits;
}
export function traitDistance(a: Traits, b: Traits): number {
  const sumWeights = axisKeys.reduce((sum, axis) => sum + axes[axis].weight, 0);
  return Math.sqrt(axisKeys.reduce((sum, axis) => sum + axes[axis].weight * (a[axis] - b[axis]) ** 2, 0) / sumWeights);
}
export function alignedAxes(user: Traits, target: Traits): Axis[] {
  return [...axisKeys].sort((a,b) => Math.abs(user[a] - target[a]) - Math.abs(user[b] - target[b]) || axisKeys.indexOf(a) - axisKeys.indexOf(b)).slice(0,3);
}
export function rankStocks(scores: Traits, universe: readonly StockPersonality[]): StockMatch[] {
  if (!isTraits(scores) || !universe.length) throw new Error("유효한 성격 점수와 종목이 필요합니다.");
  return universe.map(stock => { const distance = traitDistance(scores, stock.traits); return { stock, distance, similarity: Math.round(100 - distance), alignedAxes: alignedAxes(scores, stock.traits) }; })
    .sort((a,b) => a.distance - b.distance || (a.stock.id < b.stock.id ? -1 : a.stock.id > b.stock.id ? 1 : 0));
}
export function personalExplanation(user: Traits, match: StockMatch): string[] {
  const [first] = match.alignedAxes;
  const readings: Record<Axis, [string,string,string]> = {
    volatility: ["속은 몰라도 겉으로는 평온한 척 꽤 잘하네요.", "감정 조절 버튼은 있는데 가끔 손이 미끄러지네요.", "기분 바뀌면 얼굴이 먼저 공지 올리는 편이네요."],
    vision: ["10년 뒤보다 오늘 저녁부터 해결하고 싶은 사람이네요.", "꿈은 큰데 일단 이번 주는 살아내야 하는 사람이네요.", "아직 오지도 않은 미래에 혼자 전입신고 해뒀네요."],
    stability: ["평온해지면 본인이 먼저 새 일을 만드는 편이네요.", "변화는 좋은데 내 자리만큼은 좀 지켜줬으면 하네요.", "돌발상황 생기면 머릿속 일정표부터 비명 지르네요."],
    independence: ["남들 의견 듣다가 내 의견이 실종될 때도 있겠네요.", "의견은 듣지만 최종 결재권은 아직 쥐고 있네요.", "고집은 센데 본인은 소신이라고 부르는 편이네요."],
    momentum: ["시작 전에 조사하다가 체험판 인생 하나 끝내겠네요.", "생각과 실행 사이에서 시동을 몇 번 껐다 켜네요.", "일단 해놓고 설명서는 수습할 때 읽는 편이네요."],
    unpredictability: ["익숙한 게 좋은데 본인은 취향이 확고한 거라네요.", "계획은 지키되 샛길 하나 정도는 몰래 열어두네요.", "본인도 다음 선택을 몰라서 주변이 매번 예고편 없이 보네요."],
  };
  const reading = readings[first][user[first] >= 65 ? 2 : user[first] <= 35 ? 0 : 1];
  return [`${reading} 이런 점이 ${match.stock.name}형 캐릭터와 닮았어요.`, match.stock.description];
}
