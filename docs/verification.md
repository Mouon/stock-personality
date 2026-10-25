# Validation — 2026-10-25

- TypeScript and ESLint: passed.
- Vitest: 27 checks, all passed (12-question scoring, 106-stock identity/membership, exact-vector matching, 64 extremes, source provenance, 106 price links and PNG icons, API validation, visitor API and campaign mapping).
- Seeded 12,000-answer cohort: 100 distinct results, maximum share4.667%; docs/matching-audit.json.
- Actual local Redis Lua: first visitor increments; repeat identity remains1; second identity becomes2; dedup key persists; rate limit prevents increments. Temporary Redis stopped after verification.
- Browser: 360/390px Q3 and result, no horizontal overflow; 76–84px question buttons; icons loaded; correct Toss and Bside links; friend search and comparison; clipboard text equals public character URL; generated Korean PNG downloaded and visually inspected; developer copy absent from about screen.
- Rewritten full 12-question browser flow (Duke Energy86% all-A result), back-navigation, keyboard selection, and own/public result distinction checked. Native mobile share completion/cancellation still needs physical-device validation.
- Production build passed. All-route HTTP smoke script is supplied but the complete HTTP suite was not rerun to completion in this session.
- Live Upstash deployment, actual visitor traffic and messenger OG caching require deployment credentials/domain. Unconfigured counters stay hidden.

- Loopback HMR repair: allowedDevOrigins includes127.0.0.1; browser console confirmed [HMR] connected after restart. Same-origin visitor POST also returned200.

- Updated Apple foldable-phone joke verified against Apple Newsroom 2026-09-09; new payday question confirmed at390px without overflow; 27 checks, typecheck, lint and production build passed after edits.
