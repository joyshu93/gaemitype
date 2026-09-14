# Task 1 report — strict result provenance and selected-answer evidence

## Changes

- Added the strict URL boundary: only one registered string code paired with exactly 20 `0`/`1` values whose recomputed code matches receives `mode: "answers"`.
- Added `sharedReason` for code-only and invalid-answer shared results. Shared results omit scores and selected-answer examples.
- Added first selected left/right example evidence per axis from the same `AnswerState` used to calculate the result.
- Added presentation helpers for the approved 3:2, 4:1, 5:0 count explanations and the three result information states.
- Updated the result route to accept raw repeated search parameters and to use a scalar code only for metadata generation.
- Added the domain test file to `npm test`; runtime data imports at the Node-test boundary now use relative `.ts` paths.

## Red / green evidence

### Red

`node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/domain/scoring.test.mts`

- Before the strict-boundary change, the 21-character answer string incorrectly returned `mode: "answers"` instead of `"shared"`.
- Before examples were added, the AP example assertion received `undefined`.
- After adding presentation-helper tests but before creating the module, Node reported `ERR_MODULE_NOT_FOUND` for `result-presentation.ts`.

### Green

`node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/domain/scoring.test.mts`

- 7 tests passed: strict input states, 3:2/4:1/5:0 explanations in both directions, examples, shared omissions, input repetitions, mixed axes, and display states.

`npm test`

- 15 tests passed.

`npx tsc --noEmit`

- Passed with exit code 0.

`npm run lint`

- Passed with no warnings or errors.

## Concerns

- This task provides domain data and presentation helpers only. The result components have intentionally not consumed the new helpers yet; that belongs to the later UI/copy task.
- The stricter boundary deliberately changes malformed historical answer URLs (including 21-character values) to the answer-confirmation-failed shared state. Question data, scoring counts, majority logic, profiles, images, ads, and deployment settings were not changed.

## Commit

`Task 1: enforce result provenance and answer evidence`
