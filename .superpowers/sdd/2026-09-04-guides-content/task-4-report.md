# Task 4 Report: Connect guides to the existing experience and sitemap

## Status

Implemented and committed the Task 4 navigation and sitemap integration.

## Changes

- Replaced the redundant header home link with the `/guides` guide link while preserving the logo home link and `테스트 시작` route.
- Added the guide link to the footer between service introduction and privacy links.
- Added contextual guide links on the home, about, and result reference sections without adding new page sections or changing quiz, calculating, share, or restart behavior.
- Corrected the about-page tie explanation to reflect the five questions per axis.
- Added the guide index and all three `GUIDES` manifest entries to the sitemap with the required priorities and monthly frequency.

## Verification

- Focused navigation and sitemap assertions: red state confirmed the missing `/guides` header route; green state passed after the implementation.
- `npm.cmd test`: passed, 5 tests passed and 0 failed.
- `npm.cmd run lint`: passed with no ESLint errors.
- `git diff --check`: passed.

## Navigation and Sitemap Self-Review

- The header logo remains the home link, and every existing `테스트 시작` route remains `/quiz?reset=1`.
- The result share actions and restart behavior are unchanged; the result guide link appears before those existing actions.
- Guide pages remain ad-free because this task did not add any ad component or layout behavior to guide routes.
- The sitemap adds exactly four guide URLs: `/guides` plus the three entries from `GUIDES`.

## README Decision

No README update was required: it already documents the guide flow and the ad-free guide-page policy, and this task changes neither execution, environment, nor deployment behavior.

## Commit

- `7d3dc40 feat: connect guides across the site`

## Concerns

None.
