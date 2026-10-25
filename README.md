# 너라는 종목

**내 성격이 상장된다면?** — 12개의 질문으로 찾는 의외의 주식 닮은꼴.

STOCK PERSONALITY MVP. Next.js 16 App Router · React 19 · strict TypeScript · Tailwind CSS 4 · Lucide React. 계정, 외부 AI API, 실시간 주가 API 없이 작동하는 엔터테인먼트 앱입니다.

## 실행

Node.js 22 이상과 pnpm 11.25를 권장합니다. 바탕화면 폴더는 GitHub 업로드용 소스만 포함하며 실행기·node_modules·빌드 결과·실제 환경변수는 포함하지 않습니다.

```sh
cd ~/Desktop/stock-personality
pnpm install --frozen-lockfile
pnpm dev
```

<http://localhost:3017>에서 확인합니다. `127.0.0.1`도 개발 전용 허용 목록에 등록했습니다. HMR 연결 오류가 남으면 서버를 재시작하고 탭을 새로고침하세요.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm audit:matching
pnpm build
pnpm start
```

실행 중인 서버에 `pnpm test:smoke`를 적용하면 106개 결과 페이지·공유 PNG·잘못된 링크·API 응답을 검사합니다. 다른 URL은 `SMOKE_BASE_URL=https://example.vercel.app pnpm test:smoke`로 지정합니다.

## 기능

- 흑백 모바일 중심 랜딩, 12문항×4선택지, 진행률, 이전 질문 및 답변 수정, 키보드 선택, reduced-motion.
- 여섯 축의 명시적 선택지 점수 합산과 0~100 정규화. 같은 답변은 같은 결과.
- 정확히 미국 50개 / 한국 56개, 총 106개 고유 종목과 창작 성격 캐릭터.
- 가중 유클리드 거리, 자체 유사도, 가장 가까운 특성 3개, 개인 답변 한 줄과 장난스러운 캐릭터 설명, 강점·약점 2개씩, 차선 결과 2개.
- 간결한 성격 막대, 종목 검색을 포함한 친구 비교, 다시 테스트.
- 전106종목의 일상 습관을 놀리는 창작 카피. 사이드카·급락·물타기·단톡방·익절 뒤 급등 등11개 주식 상황과, 요청한 Q3 약속 취소 반응.
- 고려아연·코웨이·태광산업·삼영전자공업·덴티움·DB손해보험에 해당 비사이드코리아 캠페인 링크.
- 모바일360/390px의 터치 영역·글자 크기·긴 이름 줄바꿈 개선. 랜딩 장식 별 제거.
- 더 많은 의외의 이름들은 토스증권 실시간 종목 순위로 연결.
- 106종목 모두 검증한 토스증권 해당 종목의 현재가 페이지 연결.
- 결과 상단과 차선 결과에 원본 기업 식별 아이콘106개 표시. 로딩 실패시 이니셜 대안.
- `/result/us-nvda` 같은 공개 공유 링크, 동적 OG PNG, 결과 카드 다운로드.
- Web Share API, 취소 처리, 복사 대안, 수동 링크 복사 대안.
- 선택형 Upstash Redis 익명 공유 이벤트 집계와 관리자용 읽기 API.

## 개인 결과와 공유 결과

답변은 퀴즈 컴포넌트 메모리에만 있습니다. 계산된 여섯 점수는 React Context 메모리에만 유지합니다. 서버, URL, localStorage에 답변이나 점수를 보내지 않습니다.

방금 테스트를 완료한 경우에만 자신의 성향과 매칭 점수를 표시합니다. 새로고침·새 탭·친구의 링크 접속에서는 같은 공개 종목 캐릭터를 보여주며, 개인 응답을 복원했다고 표시하지 않습니다. 공유 카드도 공개 캐릭터 기반입니다.

## 데이터 기준과 출처

| 표본 | 실제 근거 | 기준 |
| --- | --- | --- |
| 미국 50개 | State Street SPY 공식 일별 보유 XLSX와 50개 티커 대조 | 파일 기준 2026-10-22, 확인 2026-10-25 |
| 한국 56개 | KRX KIND 유가증권시장 상장법인 다운로드와 56개 보통주 대조 | 내부 기준일 미표기로 실제 조회일 2026-10-25 사용 |

미국은 지수 추종 펀드 보유 내역을 이용한 S&P 500 참고 표본입니다. 실시간 지수 사업자의 구성 목록 자체로 주장하지 않습니다. 한국은 KOSPI 상장 종목이며 KOSPI 200·KOSDAQ과 구별합니다. ETF는 포함하지 않습니다. 이후 편출입·변경은 자동 갱신하지 않습니다.

- [State Street 공식 보유 목록](https://www.ssga.com/library-content/products/fund-data/etfs/us/holdings-daily-us-en-spy.xlsx)
- [KRX KIND 공식 유가증권시장 목록](https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&marketType=stockMkt)
- `src/data/sources.json`: 기업 공식 자료 등 출처 60개, 확인일과 자료일 구분.
- `docs/data/spy.xlsx`, `kospi-list.xls`: 실제 내려받은 원본 스냅샷.
- `docs/data/membership-us.json`, `membership-kr.json`: 선택 106종목 대조 증거.
- `docs/us-sources.md`, `kr-sources.md`: 회사 특징 출처와 확인 방식.

기업명과 사업 특징은 공개 자료를 참고했으며, 캐릭터·문장·장단점·점수는 직접 작성한 해석입니다. PER, 수익률, 실제 주가 변동성처럼 검증하지 않은 금융 수치는 만들지 않았습니다. 성격 점수는 심리 진단·금융 위험도·투자 적합성·수익 확률이 아닙니다.

## 토스증권 링크와 기업 아이콘

2026-10-25 공개 종목정보에서 미국50개 실제 symbol/code, 한국56개 A+종목코드/KSP/commonShare를 대조했습니다. 현재가 버튼은 해당 종목의 토스증권 페이지로 이동합니다. 런타임에 시세API나 주문API를 호출하지 않습니다.

`src/data/market-links.json`에 직접 링크, 로컬 이미지 경로, 출처, 확인일을 기록합니다. `public/company-icons`의106개PNG는 응답이 가리키는 공개 기업 아이콘을 원본색과 형태로 보존한 파일입니다. CI 전체 가이드나 협찬, 제휴를 뜻하지 않습니다. 이미지가 로딩되지 않으면 이니셜을 표시합니다.

검증 근거는 `docs/data/market-assets-us.json`, `market-assets-kr.json` 및 출처메모에 보존합니다. 외부 서비스의 지원 브라우저, 로그인, 앱 열람 정책은 토스증권 환경을 따릅니다. 결과 공유 PNG에는 직접 제작한 타이포그래피를 사용합니다.

## 모델과 분포

각 축은 주요 질문 2개(최대 ±3)와 보조 질문 2개(±1)로 구성합니다. 선택지별 명시적 점수를 더하고 가능한 최솟값·최댓값을 사용해 0~100으로 정규화합니다. 고정된 결과 분기는 없습니다. 가중 거리의 평균제곱근을 최소화하며, 닮은 정도는 `100 - 거리`를 반올림합니다. 동점은 ID로 정렬합니다.

서로 다른 작성자의 초기 편집값 기준점 차이를 줄이기 위해, 종목별 각 축의 상대 순서를 유지하는 midrank 방식으로 편집값을 15~85에 펼쳤습니다. 금융 데이터의 정규화가 아닙니다. 원래 해석값은 `docs/data/editorial-drafts.json`, 방법은 `profile-calibration.json`에 보존합니다.

균등하게 고른 선택지의 고정 seed 12,000명 시뮬레이션에서 100종목이 결과로 등장했고, 최다 종목 비중은 4.667%였습니다. 실제 이용자 분포를 보장하는 통계는 아닙니다. 테스트는 90개 이상 등장·최대 비중 8% 미만을 회귀 기준으로 사용합니다. `docs/matching-audit.json`에 전체 결과를 기록했습니다. 106개 모든 벡터의 자기 매칭도 별도로 테스트합니다.

## Vercel

1. 이 소스 폴더를 GitHub 새 저장소에 올립니다.
2. Vercel → Add New Project → 저장소 Import.
3. Framework **Next.js**, Root는 저장소 루트, Install `pnpm install --frozen-lockfile`, Build `pnpm build`, Node 22 또는 24.
4. `NEXT_PUBLIC_SITE_URL`에 실제 배포 주소를 설정하고 배포합니다. 첫 주소가 확정된 뒤 값을 설정했다면 재배포합니다.
5. 실제 모바일 공유·메신저 OG·선택형 Redis를 확인합니다.

현재 작업에서는 GitHub push나 Vercel 배포를 실행하지 않았습니다.

## 환경변수

`.env.example`을 `.env.local`로 복사하세요. 추천과 공유에는 비밀 API 키가 필요하지 않습니다.

| 변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | OG/canonical 절대 주소. 미설정 시 Vercel production URL 또는 로컬3017 |
| `UPSTASH_REDIS_REST_URL` | 선택형 방문·공유 집계 |
| `UPSTASH_REDIS_REST_TOKEN` | Redis 서버 전용 토큰 |
| `ANALYTICS_ADMIN_TOKEN` | 관리자 통계 읽기용 임의의 긴 비밀값 |

Redis가 없으면 집계만 비활성화됩니다. 토큰에 NEXT_PUBLIC 접두사를 붙이지 마세요.

## 방문자 수

`POST /api/visits`는 사이트 첫 진입에서 실행됩니다. Upstash Redis의 원자적 SETNX/INCR로 서명된 브라우저 식별자당 한 번만 누적합니다. 1년 쿠키를 사용하며 브라우저 변경·쿠키 삭제는 새 방문자로 셀 수 있습니다. 실제 사람 수의 정확한 측정값은 아닙니다. IP·답변은 저장하지 않습니다. 전체 분당120 요청 제한이 있습니다.

집계가 연결되면 소개 화면에 누적 방문자 수를 표시합니다. 환경변수 미설정 또는 장애일 때 숫자를 숨기며 가짜 카운트를 표시하지 않습니다. 배포 시 위 Upstash 두 변수를 설정해야 실제 누적됩니다. 화면에는 이 개발 설명을 노출하지 않습니다.

`src/data/campaigns.json`의6개 링크는 [비사이드코리아 공식 홈](https://bside.ai/home)에서 2026-10-25 확인한 회사별 공개 캠페인 페이지입니다. 캠페인 상태는 해당 외부 페이지를 확인하세요.

## 공유 이벤트

`share_attempt`, `share_completed`, `link_copied`, `shared_link_visit`를 구분합니다. 완료 응답은 수신자의 열람을 보장하지 않으며, 공개 URL 직접 방문과 공유 유입을 완전히 구별할 수 없습니다.

POST는 same-origin JSON만 허용하고 필드·이벤트·공개 종목 ID·UUID·1KiB 크기를 검증합니다. 개인 답변 같은 추가 필드를 거부합니다. 서명된 무작위 HttpOnly/SameSite=Strict 쿠키를 24시간 사용하며 IP·이름·User-Agent는 저장하지 않습니다.

Redis Lua에서 ID 24시간 중복 제거, 방문자·종목·이벤트별 60초 중복 완화, 방문자 분당20회와 전체 분당600회 제한을 원자적으로 수행합니다. 완료·복사는 같은 interaction의 시도가 있어야 하며 하나의 결과만 기록합니다. 쿠키 삭제·분산 호출까지 완전히 막지는 못하는 근사 통계입니다.

```sh
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" https://YOUR_DOMAIN/api/stats
```

관리자 GET 조회만 제공하고 공개 통계 수정 API는 없습니다. Redis 장애는 공유를 막지 않습니다.

## 주요 파일

`src/data/questions.ts`, `stocks.json`, `sources.json`에 명시적인 질문·종목·출처를 둡니다. 순수 계산은 `src/lib/matching.ts`, 화면은 `src/components`, 공유 API는 `src/app/api`, 동적 공개 결과는 `src/app/result/[id]/page.tsx`에 있습니다. 테스트는 `tests`, 원본과 검증 보고서는 `docs`에 있습니다.

화면은 시스템 글꼴을 사용합니다. OG는 SIL OFL [Noto Sans KR](https://github.com/google/fonts/tree/main/ofl/notosanskr)을 굵기600으로 정적 변환·부분집합한 글꼴을 사용하며 라이선스는 `public/fonts/OFL.txt`에 보관합니다. 새 한글 텍스트를 추가하면 필요한 글리프가 있는지 PNG를 확인하고 부분집합을 갱신하세요.

## 실제 환경에서 추가 확인

- iOS Safari/Android Chrome 실기기에서 네이티브 공유 완료·취소·다운로드.
- 실제 배포 도메인의 카카오톡 등 OG 캐시와 미리보기.
- 실제 Upstash 자격증명을 넣은 저장·중복·제한·관리자 통계. 로컬에서는 미설정 모드·API와 실제 임시 Redis Lua의 중복 방지·누적·제한을 확인했습니다.
# stock-personality
