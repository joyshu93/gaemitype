# Approved Experience Implementation Plan

> For agentic workers: use superpowers:subagent-driven-development to execute the two tasks in order, with independent review after each. Steps use checkboxes for progress.

**Goal:** Implement the user's approved P1–P3 experience changes without changing question meaning, scoring, images, advertising or deployment.

**Architecture:** Keep static profile data and the existing answers URL. Add strict result input validation and actual selected-answer examples to the pure result model; render personal and code-only states explicitly. Replace redundant type paragraphs with the approved static scenes and reflection questions.

**Tech Stack:** Existing Next.js, React, TypeScript, Tailwind, Node.js 24. No new runtime dependencies.

**Spec:** [Approved plan](../../reviews/2026-09-14-improvement-approval-plan.md). The user explicitly approved P1–P3 in the next conversation turn on 2026-09-14. Its historical “implementation unapproved” header records the earlier document round, not current authorization.

## Global Constraints

- Preserve questions.ts byte-for-byte, question order, option order, axis mapping, equal-weight counting, majority calculation, all 16 codes and public image assets.
- No deployment, push, merge to main, advertising changes, new product routes, login, DB, new sharing channel, image editing or S1–S3 implementation.
- Use the exact approved Korean copy in spec sections 3–5. Seven renamed types are ATRC, ATID, ATIC, PLID, PLIC, PTRC and PTIC.
- Existing valid 20-character answers URLs must retain their counts and codes. Code-only results must never read localStorage or synthesize answers.
- Keep original root reports and user changes unchanged. Work only in .worktrees/approved-experience, branch codex/approved-experience.
- Use meaningful behavior tests for scoring, examples and input boundaries. Do not write tests that merely freeze human prose or source text.
- Root agent performs browser verification. Agents must not claim source inspection is a screen observation. Implementers must not spawn subagents.

## Task 1: Strict result provenance and selected-answer evidence

**Files:** modify src/domain/types.ts, src/domain/scoring.ts, src/app/result/page.tsx and package.json; create src/domain/result-presentation.ts and src/domain/scoring.test.mts. No profile/copy/guide/UI changes yet.

**Interfaces produced:**

- AxisAnswerExample: questionId, questionNumber, prompt, selectedOptionLabel, selectedCode.
- AxisScore.examples?: AxisAnswerExample[]. Personal results populate left-first/right-second examples (first selected question in each direction), shared results omit examples and scores.
- ResultSummary retains mode answers/shared; sharedReason?: code-only/invalid-answers distinguishes no answers parameter from invalid provided answers.
- getResultFromAnswersOrCode accepts code: string | string[] | undefined, serializedAnswers?: string | string[], baseUrl: string. Repeated code is null; repeated answers with single valid code is invalid-answers shared; absent answers is code-only; exact /^[01]{20}$/ plus matching recomputed code is personal. Unknown/absent code is null. source is ignored, even if repeated.
- result-presentation.ts exports getAxisSelectionExplanation(item: AxisScore): string using the six approved 3:2/4:1/5:0 and reverse count descriptions (empty string without scores), and getResultDisplayState(result: ResultSummary): { title: string; description: string; label: string } with the exact three state copies from spec 4.1/4.2.

- [x] First make existing scoring imports executable by Node tests with relative .ts specifiers (only the runtime imports in this boundary; type-only aliases can remain). This is test setup, not changed scoring behavior. Node 24 runs .mts and strips types; no test loader or new dependency is needed.
- [x] Add failing tests against real exported functions for strict inputs and examples. A representative assertion is: result for ALRD + '0'.repeat(21) must have mode shared and sharedReason invalid-answers. Another is: ALRD + '10100'.repeat(4) must expose AP examples [{questionId:'q02',selectedCode:'A'},{questionId:'q01',selectedCode:'P'}]. Read selected labels from real output and compare with literal verified question labels, not a second call to the same producer.
- [x] Run node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/domain/scoring.test.mts; observe assertion failures caused by missing behavior before implementation.
- [x] Implement a boundary check equivalent to: if typeof code !== 'string', return null; if answers === undefined, return code-only shared; if typeof answers !== 'string' or !/^[01]{20}$/.test(answers), return invalid-answers shared; otherwise parse all positions, recompute and return personal only if codes match. Unknown code remains null. Do not change resolveAxisScore counting or majority logic.
- [x] Derive examples from the same AnswerState used for counting: filter QUESTIONS by axis, locate first selected left and first selected right, map original prompt/label/number, and omit nonexistent directions. Never infer from a type code or stored browser state.
- [x] Update result route searchParams typing to accept arrays; normalize code for metadata so malformed repeated code does not cause a crash. Route result rendering uses the same raw code/answers validation. Do not touch metadata naming/copy until Task 2.
- [x] Add selection explanation and state text helpers with exact spec copy. Test both count directions, valid modes and invalid fallback; test semantics such as both counts and absence of any output when no counts, rather than snapshotting every prose sentence.
- [x] Cover 00000×4, 01010×4, 00001×4, 11111×4, 10101×4, 11110×4, a mixed-per-axis pattern, and same 3:2 with another order. Cover missing/unknown/repeated code; absent/empty/19/21/invalid-character/repeated/mismatched answers. Shared output must omit scores/examples; shareUrl remains code-only.
- [x] Add scoring.test.mts to existing npm test command. Run npm test and npx tsc --noEmit. Record red/green commands and results; commit only this task's files locally.

**Report:** .superpowers/sdd/2026-09-14-approved-experience/task-1-report.md with changes, tests, red/green evidence, concerns and commit. Reviewer receives the task brief plus diff package.

## Task 2: Approved static copy, result UI and existing guide alignment

**Files:** src/data/axes.ts, src/data/type-profiles.ts, src/data/result-share-copy.ts, src/domain/types.ts, src/lib/result-og.ts, src/components/result/axis-grid.tsx, result-summary-card.tsx, result-page-content.tsx, share-actions.tsx; src/app/page.tsx, about/page.tsx, guides/four-axes/page.tsx, guides/reading-results/page.tsx, guides/decision-journal/page.tsx; README.md. A small helper/component or result boundary test may be created if needed. No questions/images/ads changes.

**Consumes:** Task 1's AxisScore.examples, sharedReason and result-presentation functions.

**Produces:** TypeProfile replaces strengths/habits/cautions with scenes: [string,string], reflections: [string,string]; keeps code/name/headline/description/shareText. All consumers must compile. No dynamic AI text generator.

- [x] Read exact static tables in approved spec 3.1–3.6. Transcribe all 16 profiles (names/headlines/descriptions and expanded AL/AT/PL/PT + RD/RC/ID/IC scenes, A/P + D/C questions). Keep static per-type values; no wording improvisation. Type data remains static in code.
- [x] Share copy consumes the official profile name/headline to avoid two competing names. Generated short copy may mechanically use the approved template: '이번 타입은 [name]. [headline]예요.' (headline ends in 개미). OG description uses '[headline]. 일상 선택을 돌아보는 개미타입 결과예요.' Update any used/unused share-card consumers without enabling the dormant feature.
- [x] Add a failing behavior regression check for consumer output where useful: if metadata is tested, it must use the matching code/name/image and omit answers; if UI render is tested, shared must contain no distribution/example elements. Avoid tests that merely compare every static wording literal. Main browser validation is the required final UI proof.
- [x] Render summary DOM in this order: name/headline, description, state title/description, existing image. State label is 이번 답변 요약 or 타입 기본 설명. Mobile state must not depend on hidden desktop badge. Adjust top padding/spacing for 390×844 first-viewport copy without changing image asset or wholesale image sizing.
- [x] AxisGrid receives explicit result mode. Shared/invalid renders only title, selected letter/name, explanation ending 쪽을 뜻해요. No opposite label, marker, track, blank chart placeholder, count, sample or repeated no-answers footer. Personal renders named counts, optional genuine distribution graphic after counts, explanation, full original question/selected-option examples, left→right. No truncation or accordions. Decorative chart is hidden from assistive technology; actual counts convey semantics.
- [x] Put the exact common explanation of selection counts and sampling rule before personal axes. Replace old three profile sections with the approved two-scenes block and two-reflections block, including fictional-scene notice, personal-only reference to earlier examples and the optional-recollection notice.
- [x] Apply spec 3.6 to existing landing teaser, about explanation, guide references and sharing footer. Keep buttons' behavior: link copies code-only URL; text copies text only. Never claim an address-bar answers URL lacks answers.
- [x] Update README result model, names/body coverage, personal/shared/fallback rules, input limits, examples and checks. Keep environment/advertising instructions unchanged; do not update external service status or claim fresh deployment.
- [x] Run npm test, npm run lint, npm run build. Fix only regressions caused by this task or necessary to its approved behavior. Record results and commit this task's files locally.

**Report:** .superpowers/sdd/2026-09-14-approved-experience/task-2-report.md with changed files, checks and commit. Main then opens local build for desktop/mobile/URL/metadata verification and requests full implementation review.

## Final verification and handoff

- [x] Main verifies the implemented result in the browser: desktop 1440×900, mobile 390×844 and 360×640; personal 3:2/5:0/reverse, shared after personal, invalid answers, unknown/repeated code, repeated answers/source, original questions through completed quiz where practical.
- [x] Read-only review compares all 16 static types and 32 neighboring pairs to the accepted tables, plus actual copied URL/text and all 16 metadata/code/image associations. Do not send messages externally.
- [x] Record exact executed checks, role decisions, residual limits and original-file/image/question preservation in docs/reviews/2026-09-14-approved-experience-implementation.md. Update this plan's checkboxes and ledger. All product work remains on the local feature branch; no deploy or push.
