# Task 1 Report: Guide Manifest

## Implementation

- Added `src/data/guides.mts` with the three required static guide records:
  - `four-axes`
  - `reading-results`
  - `decision-journal`
- Exported `GUIDES` as a readonly tuple, plus `GuideSummary` and `GuideSlug` types.
- Added `src/data/guides.test.mts` with the required count, uniqueness, format, and non-empty metadata assertions.
- Updated the `package.json` test script to run the existing ads tests and the guide manifest tests.
- No quiz/calculating flow, ad behavior, or README content was changed. README modification was unnecessary because execution instructions and user-visible flows are unchanged.

## Commands And Outputs

### RED

Command:

```text
npm.cmd test
```

Result: exit code `1`.

Relevant output:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\\src\\data\\guides.mts'
✖ src\\data\\guides.test.mts
✔ 광고가 비활성화되면 결과 슬롯과 스크립트를 사용하지 않는다
✔ client와 slot이 모두 있을 때만 결과 광고 스크립트 주소를 만든다
ℹ tests 3
ℹ pass 2
ℹ fail 1
```

This was the expected RED failure before creating the production manifest.

### GREEN

Command:

```text
npm.cmd test
```

Result: exit code `0`.

```text
✔ 가이드는 완성된 3개 문서만 공개한다
✔ 가이드의 경로와 메타데이터는 비어 있거나 중복되지 않는다
✔ 광고가 비활성화되면 결과 슬롯과 스크립트를 사용하지 않는다
✔ client와 slot이 모두 있을 때만 결과 광고 스크립트 주소를 만든다
ℹ tests 4
ℹ pass 4
ℹ fail 0
```

### Additional verification

```text
npm.cmd run lint
```

Result: exit code `0`; ESLint reported no errors. npm printed only an available-version notice.

```text
git diff --check
```

Result: exit code `0`; no whitespace errors.

## Files Changed

- `package.json`
- `src/data/guides.mts`
- `src/data/guides.test.mts`
- `.superpowers/sdd/2026-09-04-guides-content/task-1-report.md`

## Self-Review

- Confirmed exactly three guide records are exported.
- Confirmed slugs are lowercase kebab-case and titles are unique.
- Confirmed every record has non-empty `eyebrow`, `title`, and `description` values.
- Confirmed all metadata values match the task brief verbatim.
- Confirmed the test command still includes the existing ads tests.
- Confirmed no generated type-specific articles, CMS/search/category/tag/pagination/comment features, or investment-advice language were added.

## Concerns

- No functional concerns identified for Task 1.
- Git emitted harmless LF-to-CRLF normalization warnings for touched text files; `git diff --check` passed.
- The task-specific validation covered tests and lint; a production build was not required by the brief and was not run.

## Commits

- `020ee19 test: define guide content manifest`
- Report commit: added after this report was written.

## Fix Round 1/5

### What changed

Updated the `reading-results` guide description in `src/data/guides.mts` to replace the evaluative-sounding phrase `강점과 주의점을 읽는 기준` with explicit current-answer-summary framing: `결과를 현재 답변의 요약으로 읽는 기준`.

The reviewer's Minor test-coverage suggestion was intentionally not addressed in this fix round.

### Covering test files

- `src/data/guides.test.mts`
- `src/lib/ads.test.mts`

### Exact command and output

```text
npm.cmd test

> gaemitype@0.1.0 test
> node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/lib/ads.test.mts src/data/guides.test.mts

✔ 가이드는 완성된 3개 문서만 공개한다
✔ 가이드의 경로와 메타데이터는 비어 있거나 중복되지 않는다
✔ 광고가 비활성화되면 결과 슬롯과 스크립트를 사용하지 않는다
✔ client와 slot이 모두 있을 때만 결과 광고 스크립트 주소를 만든다
ℹ tests 4
ℹ pass 4
ℹ fail 0
```
