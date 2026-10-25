import type { Question } from "@/types/personality";
// Each axis has two primary (±3) and two secondary (±1) measurements.
// Fictional reactions describe personality; the options are never trading advice.
export const questions: readonly Question[] = [
  { id: "q01", context: "월급날의 본심", title: "이번 달 월급이 들어왔다. 주식 계좌에 넣는다면?", options: [
    { label: "항상 사던 종목! 역시 적립식이 최고야.", scores: {"stability": 3, "unpredictability": -1} },
    { label: "아, 삼전닉스! 이번 달 급등은 내 거다!!", scores: {"stability": -3, "unpredictability": 1} },
    { label: "새 종목은 무슨… 물타야 해. 내 평단 살려!", scores: {"stability": 1, "unpredictability": 1} },
    { label: "계좌 안 봐. 이제 주식 안 할란다…", scores: {"stability": -1, "unpredictability": -1} },
  ]},
  { id: "q02", context: "급락장 속의 나", title: "오늘 급락장에 사이드카까지 발동했다. 내 반응은?", options: [
    { label: "일단 홀딩. 오늘은 계좌랑 눈 안 마주친다.", scores: {"volatility": -3, "independence": 1} },
    { label: "홀딩은 하는데… 단톡방에서 위로 좀 받아야겠다.", scores: {"volatility": -1, "independence": -1} },
    { label: "주식 앱 삭제. 다시 깔 때까지 난 주식 안 한 사람.", scores: {"volatility": 3, "independence": 1} },
    { label: "물탈까?! 단톡방에 물어보고 주문창을 들락날락.", scores: {"volatility": 1, "independence": -1} },
  ]},
  { id: "q03", context: "갑자기 생긴 자유시간", title: "나가기 직전, 친구가 약속을 취소했다.", options: [
    { label: "솔직히 나가기 귀찮았는데… 개꿀. 바로 눕는다.", scores: {"volatility": -3, "independence": 1} },
    { label: "괜찮다고는 했는데, 나만 좀 서운한가?", scores: {"volatility": -1, "independence": -1} },
    { label: "아, 준비 다 했는데! 입은 옷보다 표정부터 구겨진다.", scores: {"volatility": 3, "independence": 1} },
    { label: "이미 나갈 모드인데? 다른 친구한테 바로 연락한다.", scores: {"volatility": 1, "independence": -1} },
  ]},
  { id: "q04", context: "단톡방의 유혹", title: "친구들이 같은 종목으로 신났다. 나만 안 샀다.", options: [
    { label: "나만 소외될 순 없지. 소액이라도 같이 탄다.", scores: {"independence": -3, "stability": -1} },
    { label: "다 같이 보니까 든든하네. 익숙한 회사면 알아본다.", scores: {"independence": -1, "stability": 1} },
    { label: "다들 저쪽이면 난 다른 데. 내 종목은 내가 찾는다.", scores: {"independence": 3, "stability": -1} },
    { label: "축하는 해줄게. 난 원래 봐둔 종목이나 볼란다.", scores: {"independence": 1, "stability": 1} },
  ]},
  { id: "q05", context: "관심만 몇 번째", title: "알아봐야지 했던 종목, 오늘도 올랐다.", options: [
    { label: "급해도 실적이랑 가격부터 다시 확인한다.", scores: {"momentum": -3, "vision": -1} },
    { label: "앞으로 커질 그림을 더 정리한다. 아직 생각 중.", scores: {"momentum": -1, "vision": 1} },
    { label: "더 미루기 전에 1주. 공부는 사놓고 한다.", scores: {"momentum": 3, "vision": -1} },
    { label: "미래 그림은 마음에 든다. 나눠 담을 계획부터 실행.", scores: {"momentum": 1, "vision": 1} },
  ]},
  { id: "q06", context: "관심종목 구경", title: "관심종목에 딱 하나 더 넣는다면?", options: [
    { label: "늘 보던 회사. 아는 맛이 제일 안심된다.", scores: {"unpredictability": -3, "volatility": -1} },
    { label: "찜해둔 새 종목. 후기 보니까 괜히 설렌다.", scores: {"unpredictability": -1, "volatility": 1} },
    { label: "이름부터 처음 듣는 회사. 뭐 하는 덴데? 재밌겠다!", scores: {"unpredictability": 3, "volatility": 1} },
    { label: "다른 거 검색하다 우연히 본 회사. 조용히 저장.", scores: {"unpredictability": 1, "volatility": -1} },
  ]},
  { id: "q07", context: "갑자기 방향 전환", title: "내가 오래 보던 회사가 사업 방향을 확 바꾼단다.", options: [
    { label: "원래 잘하던 건? 그거 지키는지부터 확인한다.", scores: {"stability": 3, "unpredictability": -1} },
    { label: "필요한 변화면 좋지. 새 계획을 하나씩 살펴본다.", scores: {"stability": 1, "unpredictability": 1} },
    { label: "드디어 새 판! 오히려 관심이 더 생긴다.", scores: {"stability": -3, "unpredictability": 1} },
    { label: "궁금은 한데, 소액으로 지켜볼 길부터 남겨둔다.", scores: {"stability": -1, "unpredictability": -1} },
  ]},
  { id: "q08", context: "내 눈길을 잡는 회사", title: "종목 소개를 읽다가 멈췄다. 어떤 한 줄 때문?", options: [
    { label: "지금 뭘 팔고 돈 버는지 한눈에 이해되는 회사.", scores: {"vision": -3, "momentum": -1} },
    { label: "요즘 불편했던 문제를 이미 제품으로 바꾼 회사.", scores: {"vision": -1, "momentum": 1} },
    { label: "아직 없는 시장? 그 시장 자체를 만들겠다는 회사.", scores: {"vision": 3, "momentum": -1} },
    { label: "미래에 필요할 기술을 지금 직접 시험하는 회사.", scores: {"vision": 1, "momentum": 1} },
  ]},
  { id: "q09", context: "주식 영상 알고리즘", title: "주식 영상 보다가 귀가 쫑긋. 어떤 얘기였을까?", options: [
    { label: "이 회사가 이미 꾸준히 돈 버는 구조를 뜯어보는 얘기.", scores: {"vision": -3, "momentum": -1} },
    { label: "이번에 바뀐 제품이 생활을 어떻게 편하게 했는지.", scores: {"vision": -1, "momentum": 1} },
    { label: "이 기술이 세상을 뒤집을 미래를 한참 상상하는 얘기.", scores: {"vision": 3, "momentum": -1} },
    { label: "아직 작은 새 사업을 실제로 돌려본 현장 이야기.", scores: {"vision": 1, "momentum": 1} },
  ]},
  { id: "q10", context: "친구의 한마디", title: "내 관심종목을 본 친구가 “그걸 왜 봐?” 한다.", options: [
    { label: "그런가? 친구가 좋다는 새 종목도 같이 구경한다.", scores: {"independence": -3, "stability": -1} },
    { label: "뭐가 별론지 듣고, 둘 다 잘 아는 회사랑 비교한다.", scores: {"independence": -1, "stability": 1} },
    { label: "네 취향은 네 취향. 난 내가 꽂힌 이유가 있다.", scores: {"independence": 3, "stability": -1} },
    { label: "내가 오래 봐온 근거부터 차근차근 설명한다.", scores: {"independence": 1, "stability": 1} },
  ]},
  { id: "q11", context: "매수 버튼 앞에서", title: "매수 버튼 누르기 직전. 지금 내 상태는?", options: [
    { label: "잠깐만. 숫자랑 주문 금액 한 번만 더 확인.", scores: {"momentum": -3, "vision": -1} },
    { label: "이 회사의 몇 년 뒤를 상상하느라 아직 안 누름.", scores: {"momentum": -1, "vision": 1} },
    { label: "직전이요? 이미 체결 알림 왔는데요.", scores: {"momentum": 3, "vision": -1} },
    { label: "커질 그림은 그려뒀다. 계획한 첫 1주부터 시작.", scores: {"momentum": 1, "vision": 1} },
  ]},
  { id: "q12", context: "팔고 나니 더 간다", title: "익절했는데… 팔자마자 더 오른다. 나는?", options: [
    { label: "내 계획대로 팔았으니 끝. 앱 닫고 밥 먹는다.", scores: {"unpredictability": -3, "volatility": -1} },
    { label: "배는 좀 아프다. 다시 볼 기준이나 적어둔다.", scores: {"unpredictability": -1, "volatility": 1} },
    { label: "못 참겠다. 방금 판 종목 다시 검색하고 있다.", scores: {"unpredictability": 3, "volatility": 1} },
    { label: "그럼 난 다른 종목 구경. 새 관심사가 생겼다.", scores: {"unpredictability": 1, "volatility": -1} },
  ]},
];
