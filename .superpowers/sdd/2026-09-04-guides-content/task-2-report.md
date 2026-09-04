# Task 2 Report: Guide Index And Shared Article Layout

## Implementation

- Added `src/components/guides/guide-layout.tsx` with the prescribed `GuideLayout` interface and a `max-w-3xl` reading column.
- The shared layout provides the guide-list link, eyebrow, H1, summary, vertically spaced article body, required safety note, one related-guide link, and the `/quiz?reset=1` CTA.
- Added `src/app/guides/page.tsx` with the required metadata and canonical path.
- The guide index is driven only by `GUIDES`, renders three complete-card links, and remains one column below the `sm` breakpoint.
- Enabled `allowImportingTsExtensions` in `tsconfig.json` so Task 2 can consume Task 1's required `guides.mts` manifest from TSX source files.
- Updated `README.md` because `/guides` is a new user-visible route, and documented that guide pages are ad-free.

## Verification

### Required typecheck

```text
npx.cmd tsc --noEmit
```

Result: exit code `0`; no type errors.

## Self-Review

- Confirmed the index exposes exactly the three `GUIDES` records and no CMS, search, categories, tags, pagination, comments, or generated type-specific articles.
- Confirmed no quiz or calculating flow changed, and no ad component or ad script was added to guide pages.
- Confirmed both guide-page safety notes retain current-answer-summary framing and do not describe recommendations, products, portfolios, returns, timing, or performance.
- Confirmed the required index metadata values match the task brief exactly.
- Confirmed the shared layout's safety-note text matches the task brief exactly.
- Confirmed each guide card is one `Link` covering its entire card, with `sm:grid-cols-3` preserving one column on mobile.

## Concerns

- The three article routes are intentionally not created in this task; their shared layout is ready for Task 3.
- The `.mts` manifest requires the added compiler option for TSX consumers. This is a minimal configuration compatibility change, not a feature expansion.
