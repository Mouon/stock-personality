# 토스증권 모바일 앱 링크

확인일: 2026-10-25 (Asia/Seoul).

`src/lib/market-links.ts`의 `getTossLink`는 토스 공식 OneLink로 연결한다. 기기별 연결은 OneLink가 처리하므로 화면 너비나 User-Agent 추측, 클라이언트 타이머를 사용하지 않는다. 퀴즈 답변이나 개인 성격 점수는 링크에 포함하지 않는다.

- 앱 연결: `supertoss://securities?url={encoded mobile URL}`.
- 모바일 URL: `https://service.tossinvest.com/?nextLandingUrl={encoded /stocks/{code}}`.
- PC 대체 경로 `af_web_dp`: 기존에 검증한 `https://www.tossinvest.com/stocks/{code}/order`.
- 앱 미설치 시 `af_ios_url`, `af_android_url`: 공식 `https://contents.tossinvest.com/stocks/{code}` 소개 화면.
- 랜딩 페이지 링크는 종목코드 없이 증권 홈을 연다.
- 모바일 앱 전환을 위해 같은 탭의 일반 링크로 제공한다. JavaScript 없이도 HTTPS 링크를 사용할 수 있다.

## 공식 코드에서 확인한 근거

인증·쿠키 없이 아래 공개 스크립트를 읽어 형식을 확인했다. 외부 코드를 실행하거나 단축 URL 생성 API에 쓰기 요청을 하지 않았다.

1. [토스증권 종목 페이지](https://www.tossinvest.com/stocks/A005930/order)의 `_app-7c16e9ce23920afc.js`, 모듈 30016: 공식 `https://toss.onelink.me/3563614660`, `pid=referral`, `af_dp`, `af_force_deeplink` 사용.
2. 같은 페이지의 `7572-e50d6343f5f20365.js`: 종목 화면 공유 함수 `getStockUrl`이 `https://service.tossinvest.com?nextLandingUrl=/stocks/{code}`, `https://contents.tossinvest.com/stocks/{code}`, PC 종목 URL을 함께 구성한다.
3. [모바일 증권 서비스](https://service.tossinvest.com)의 `_app-eec9d4b70e34b92e.js`: `securities` 스킴 빌더와 실제 탐색 함수에서 `supertoss://securities?url=...`, `nextLandingUrl`의 중첩 인코딩 확인.
4. [AppsFlyer 공식 파라미터 문서](https://support.appsflyer.com/hc/en-us/articles/207447163-About-link-structure-and-parameters), [공식 OneLink 활용 문서](https://www.appsflyer.com/use-cases/customer-experience-deep-linking/onelink-features-performance-hacks/): `af_web_dp`, `af_ios_url`, `af_android_url`의 기기별 대체 URL 사용.

106개 전체에 대해 앱 안의 종목코드, PC URL, 미설치 대체 URL의 일치를 테스트한다. 앱 실행 자체는 OS, 설치 상태, 브라우저 및 토스 정책에 따르며 iOS/Android 실기기에서의 앱 전환은 별도 확인이 필요하다.

## 검증 결과

실제 OneLink GET 요청이 HTTP 301로 삼성전자 PC 종목 화면에 연결되고 최종 HTTP 200을 반환하는 것을 확인했다. 리디렉션 시 OneLink 파라미터가 대체 URL에 전달될 수 있으며 종목 경로는 유지됐다. 단위 테스트로 106개 종목의 앱·PC·미설치 경로를 대조했다.
