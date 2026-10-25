# Korean corporate stock icons

Checked 2026-10-25. All 50 logoImageUrl values came from a public Toss Securities stock-info response with code matching A + the six-digit KRX ticker, market.code KSP, and commonShare true. Asset responses were downloaded without credentials; PNG signatures, dimensions, and actual image content were checked. A contact sheet was visually inspected. No missing assets remain.

Discovery page: https://www.tossinvest.com/stocks/A005930/order

Public JavaScript referenced by that page: https://www.tossinvest.com/assets/v3/_next/static/chunks/pages/_app-7c16e9ce23920afc.js

That public bundle module 10893 exposes the GET stock-info route: https://wts-info-api.tossinvest.com/api/v2/stock-infos/A005930 . Each company's exact source URL and returned name/code/market are recorded in logos-kr.json. Raw public responses are saved in toss-kr-info/{ticker}.json.

Original icons are preserved without recoloring or redesign. Some subsidiaries share a corporate group icon, exactly as returned by the public stock-info source. Total size is 995,011 bytes for 50 PNG files. Widths/heights are recorded per item. Homepage URLs are sourced from KIND; empty entries and one malformed scheme are explicitly noted.

The research source provides a usable icon URL but does not establish a separate grant of trademark rights. Attribution records identify the source and distinguish stock icons from official corporate website favicons.


## Expansion to 56
Added 고려아연, 코웨이, 태광산업, 삼영전자공업, 덴티움, DB손해보험 using the same KSP/commonShare/code checks on 2026-10-25. Final full evidence: `docs/data/market-assets-kr.json` (56), local PNGs in `public/company-icons`. The original50-asset audit above is retained as history.
