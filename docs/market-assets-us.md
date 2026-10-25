# Toss 미국 종목 매핑 확인

2026-10-25 확인.

- 공식 홈페이지 공개 정적 스크립트가 `/api/v3/search-all/wts-auto-complete` POST 검색 및 `/stocks/[symbol-or-stock-code]/order` 공개 라우트를 명시한다.
- 인증·쿠키 없이 curl로 AAPL 검색을 요청해 정상 JSON을 받았다. productCode와 exact symbol로 식별했으며 logoImageUrl을 그대로 수록했다.
- 같은 공개 API를 Python urllib 병렬조회했을 때403을 받아 중단했다.403을 우회하거나 로그인 정보를 사용하지 않았다.
- 검증하지 못한 종목은 verified:false와 tossUrl:null로 남긴다.

## Final verification: 50/50

- Stopped Python urllib POST requests after403; did not bypass that refusal.
- Official public JS also declares a separate GET endpoint: https://wts-info-api.tossinvest.com/api/v2/stock-infos/code-or-symbol/{symbol}. First verified NVDA returned200 and its real product identity.
- Used the same ordinary curl client as the original successful request to query all50 public GET records. All returned matching symbols. No authentication, cookies, header impersonation or access-control bypass used.
- Extracted code/name/symbol/logoImageUrl. Constructed URLs from returned product codes using the official public route generator /stocks/{stockCode}/order, also declared in build manifest as /stocks/[symbol-or-stock-code]/order.
- Downloaded50 PNGs directly from returned official logoImageUrl into logos/toss-us-{ticker}.png. Verified PNG signatures and nonzero dimensions.
- Final toss-us.json contains identity and logo mapping fields only; financial statistics and ratings from public responses are not used in app profiles.
