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
    { label: "오히려 기회!!!!! 싸게 살 기회다!!!", scores: {"volatility": -1, "independence": 1} },
    { label: "주식 앱 삭제. 다시 깔 때까지 난 주식 안 한 사람.", scores: {"volatility": 3, "independence": 1} },
    { label: "물탈까?! 단톡방에 물어보고 주문창을 들락날락.", scores: {"volatility": 1, "independence": -1} },
  ]},
  { id: "q03", context: "갑자기 생긴 자유시간", title: "나가기 직전, 친구가 약속을 취소했다.", options: [
    { label: "솔직히 나가기 귀찮았는데… 개꿀. 바로 눕는다.", scores: {"volatility": -3, "independence": 1} },
    { label: "준비한 김에 혼자서라도 외출한다. 이왕 입은 옷인데!", scores: {"volatility": -1, "independence": 1} },
    { label: "아, 준비 다 했는데! 입은 옷보다 표정부터 구겨진다.", scores: {"volatility": 3, "independence": 1} },
    { label: "이미 나갈 모드인데? 다른 친구한테 바로 연락한다.", scores: {"volatility": 1, "independence": -1} },
  ]},
  { id: "q04", context: "단톡방의 유혹", title: "친구들이 같은 종목으로 신났다. 나만 안 샀다.", options: [
    { label: "나만 소외될 순 없지. 소액이라도 같이 탄다.", scores: {"independence": -3, "stability": -1} },
    { label: "축하한다고는 했는데… 배가 너무 아프다. 지금이라도 탈까?", scores: {"independence": -1, "stability": 1} },
    { label: "단톡방 알림 끈다. 내 종목 오르면 그때 입장할게.", scores: {"independence": 3, "stability": -1} },
    { label: "축하는 해줄게. 난 원래 봐둔 종목이나 볼란다.", scores: {"independence": 1, "stability": 1} },
  ]},
  { id: "q05", context: "관심만 몇 번째", title: "알아봐야지 했던 종목, 오늘도 올랐다.", options: [
    { label: "아, 어제 살걸!! 이미 늦었다… 쳐다도 안 본다.", scores: {"momentum": -3, "vision": -1} },
    { label: "앞으로 커질 그림을 더 정리한다. 아직 생각 중.", scores: {"momentum": -1, "vision": 1} },
    { label: "더 미루기 전에 1주. 공부는 사놓고 한다.", scores: {"momentum": 3, "vision": -1} },
    { label: "미래 그림은 마음에 든다. 나눠 담을 계획부터 실행.", scores: {"momentum": 1, "vision": 1} },
  ]},
  { id: "q06", context: "관심종목 구경", title: "관심종목에 딱 하나 더 넣는다면?", options: [
    { label: "늘 보던 회사. 아는 맛이 제일 안심된다.", scores: {"unpredictability": -3, "volatility": -1} },
    { label: "지금 들고 있는 종목의 밸류체인 회사! 얘네도 한 식구잖아.", scores: {"unpredictability": -1, "volatility": 1} },
    { label: "이름부터 처음 듣는 회사. 뭐 하는 덴데? 재밌겠다!", scores: {"unpredictability": 3, "volatility": 1} },
    { label: "다른 거 검색하다 우연히 본 회사. 조용히 저장.", scores: {"unpredictability": 1, "volatility": -1} },
  ]},
  { id: "q07", context: "갑자기 방향 전환", title: "내가 오래 보던 회사가 사업 방향을 확 바꾼단다.", options: [
    { label: "원래 잘하던 건? 그거 지키는지부터 확인한다.", scores: {"stability": 3, "unpredictability": -1} },
    { label: "필요한 변화면 좋지. 새 계획을 하나씩 살펴본다.", scores: {"stability": 1, "unpredictability": 1} },
    { label: "드디어 새 판! 오히려 관심이 더 생긴다.", scores: {"stability": -3, "unpredictability": 1} },
    { label: "아니, 설마 분할상장하려고?? 공시부터 뒤진다.", scores: {"stability": -1, "unpredictability": -1} },
  ]},
  { id: "q08", context: "내 눈길을 잡는 회사", title: "종목 소개를 읽다가 멈췄다. 어떤 한 줄 때문?", options: [
    { label: "지금 뭘 팔고 돈 버는지 한눈에 이해되는 회사.", scores: {"vision": -3, "momentum": -1} },
    { label: "요즘 불편했던 문제를 이미 제품으로 바꾼 회사.", scores: {"vision": -1, "momentum": 1} },
    { label: "자동차가 하늘을 난다고? 출근길 상상하다 지각함.", scores: {"vision": 3, "momentum": -1} },
    { label: "미래에 필요할 기술을 지금 직접 시험하는 회사.", scores: {"vision": 1, "momentum": 1} },
  ]},
  { id: "q09", context: "수익 나면 뭐 하지", title: "“주식으로 돈 벌면 뭐 할 거야?” 친구가 묻는다.", options: [
    { label: "일단 카드값. 내 미래보다 결제일이 먼저 온다.", scores: {"vision": -3, "momentum": -1} },
    { label: "배달앱부터 켠다. 오늘 치킨은 내가 쏜다!", scores: {"vision": -1, "momentum": 1} },
    { label: "퇴사하고 한강뷰. 아직 수익은 없는데 집은 골랐다.", scores: {"vision": 3, "momentum": -1} },
    { label: "미래의 나도 좀 쓰자. 여행 적금부터 바로 만든다.", scores: {"vision": 1, "momentum": 1} },
  ]},
  { id: "q10", context: "친구의 한마디", title: "내 관심종목을 본 친구가 “그걸 왜 봐?” 한다.", options: [
    { label: "그런가? 친구가 좋다는 새 종목도 같이 구경한다.", scores: {"independence": -1, "stability": -1} },
    { label: "아, 그런가? 바로 관심종목 삭제. 귀가 아주 가볍다.", scores: {"independence": -3, "stability": 1} },
    { label: "네가 뭘 알아? 이게 미래야~!", scores: {"independence": 3, "stability": -1} },
    { label: "내가 오래 봐온 근거부터 차근차근 설명한다.", scores: {"independence": 1, "stability": 1} },
  ]},
  { id: "q11", context: "매수 버튼 앞에서", title: "매수 버튼 누르기 직전. 지금 내 상태는?", options: [
    { label: "잠깐만. 숫자랑 주문 금액 한 번만 더 확인.", scores: {"momentum": -3, "vision": -1} },
    { label: "100번 고민하고 0.1주 체결. 미래는 믿는데 손은 떨림.", scores: {"momentum": -1, "vision": 1} },
    { label: "직전이요? 이미 체결 알림 왔는데요.", scores: {"momentum": 3, "vision": -1} },
    { label: "커질 그림은 그려뒀다. 계획한 첫 1주부터 시작.", scores: {"momentum": 1, "vision": 1} },
  ]},
  { id: "q12", context: "팔고 나니 더 간다", title: "익절했는데… 팔자마자 더 오른다. 나는?", options: [
    { label: "내 계획대로 팔았으니 끝. 앱 닫고 밥 먹는다.", scores: {"unpredictability": -3, "volatility": -1} },
    { label: "내가 파니까 또 오르네… 역시 나만 보고 있었지?", scores: {"unpredictability": -1, "volatility": 1} },
    { label: "못 참겠다. 방금 판 종목 다시 검색하고 있다.", scores: {"unpredictability": 3, "volatility": 1} },
    { label: "그럼 난 다른 종목 구경. 새 관심사가 생겼다.", scores: {"unpredictability": 1, "volatility": -1} },
  ]},
];
