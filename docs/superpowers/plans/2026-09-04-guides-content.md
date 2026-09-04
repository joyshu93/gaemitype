# Guide Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a small, indexable guide section with three original articles that explain Gaemitype's axes, result codes, and self-reflection use without presenting investment advice.

**Architecture:** Keep all guide metadata in one static manifest and implement each article as a static App Router page using one shared article layout. Link the finished pages from existing navigation and relevant content, add them to the sitemap, and update project documentation without introducing a CMS or runtime data source.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Node.js built-in test runner

**Spec:** `docs/superpowers/specs/2026-09-04-guides-content-design.md`

## Global Constraints

- Publish exactly three guide articles plus one guide index.
- Do not add a CMS, search, categories, tags, pagination, comments, or type-specific generated articles.
- Do not describe stock picks, financial products, portfolios, returns, buy/sell timing, or investment performance.
- Treat every result as a current-answer summary, not a diagnosis, skill score, risk assessment, or prediction.
- Keep quiz and calculating flows unchanged and ad-free.
- Keep ads off all guide pages.
- Use unique title, description, canonical URL, and H1 for every guide page.

---

### Task 1: Create and validate the guide manifest

**Files:**
- Create: `src/data/guides.test.mts`
- Create: `src/data/guides.mts`
- Modify: `package.json`

**Interfaces:**
- Produces: `GUIDES: readonly GuideSummary[]`
- Produces: `GuideSlug` and `GuideSummary` types
- `GuideSummary` fields: `slug`, `title`, `description`, `eyebrow`

- [ ] **Step 1: Add the failing manifest test and include it in the test command**

Create `src/data/guides.test.mts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { GUIDES } from "./guides.mts";

test("가이드는 완성된 3개 문서만 공개한다", () => {
  assert.equal(GUIDES.length, 3);
});

test("가이드의 경로와 메타데이터는 비어 있거나 중복되지 않는다", () => {
  const slugs = GUIDES.map((guide) => guide.slug);
  const titles = GUIDES.map((guide) => guide.title);

  assert.equal(new Set(slugs).size, GUIDES.length);
  assert.equal(new Set(titles).size, GUIDES.length);

  for (const guide of GUIDES) {
    assert.match(guide.slug, /^[a-z0-9-]+$/);
    assert.ok(guide.title.trim().length > 0);
    assert.ok(guide.description.trim().length > 0);
    assert.ok(guide.eyebrow.trim().length > 0);
  }
});
```

Change `package.json` test script to:

```json
"test": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/lib/ads.test.mts src/data/guides.test.mts"
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm.cmd test`

Expected: FAIL because `src/data/guides.mts` does not exist.

- [ ] **Step 3: Add the minimal guide manifest**

Create `src/data/guides.mts` with these records:

```ts
export const GUIDES = [
  {
    slug: "four-axes",
    eyebrow: "4가지 판단 축",
    title: "개미타입의 4가지 판단 축 읽는 법",
    description:
      "준비 방식, 시간 시야, 판단 기준, 확신 방식이 무엇을 뜻하는지 일상적인 선택 장면과 함께 살펴봅니다."
  },
  {
    slug: "reading-results",
    eyebrow: "16타입 결과",
    title: "4글자 코드와 16가지 개미타입 이해하기",
    description:
      "네 글자가 조합되는 순서와 비슷해 보이는 타입을 비교하는 방법, 강점과 주의점을 읽는 기준을 정리합니다."
  },
  {
    slug: "decision-journal",
    eyebrow: "판단 기록",
    title: "내 판단 습관을 한 줄로 기록하는 법",
    description:
      "결과를 행동 지침으로 쓰지 않고, 무엇을 먼저 보고 왜 마음이 움직였는지 돌아보는 간단한 기록법을 소개합니다."
  }
] as const;

export type GuideSummary = (typeof GUIDES)[number];
export type GuideSlug = GuideSummary["slug"];
```

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `npm.cmd test`

Expected: all ad and guide manifest tests PASS.

- [ ] **Step 5: Commit the manifest and tests**

```bash
git add package.json src/data/guides.mts src/data/guides.test.mts
git commit -m "test: define guide content manifest"
```

---

### Task 2: Build the guide index and shared article layout

**Files:**
- Create: `src/components/guides/guide-layout.tsx`
- Create: `src/app/guides/page.tsx`

**Interfaces:**
- Consumes: `GUIDES` and `GuideSummary` from `src/data/guides.mts`
- Produces: `GuideLayout` component with `eyebrow`, `title`, `summary`, `relatedGuide`, and `children`

- [ ] **Step 1: Implement the shared article layout**

Create `src/components/guides/guide-layout.tsx`. It must:

- use a `max-w-3xl` reading column;
- provide a top `가이드 목록` link;
- render eyebrow, H1, and summary;
- render `children` inside a vertically spaced article container;
- include this safety note after the article body:

```text
개미타입은 현재 답변에서 드러난 판단 습관을 가볍게 정리한 참고용 콘텐츠입니다. 투자 적합성이나 위험 감수 수준을 진단하지 않으며, 종목 추천·수익 보장·맞춤형 투자 제안·매수나 매도 신호를 제공하지 않습니다.
```

- show one related guide link and one `/quiz?reset=1` CTA at the bottom.

- [ ] **Step 2: Implement the guide index**

Create `src/app/guides/page.tsx` with:

```ts
export const metadata: Metadata = {
  title: "투자 성향 가이드 | 개미타입",
  description: "개미타입의 4가지 판단 축과 16타입 결과를 읽고 판단 습관을 돌아보는 가이드입니다.",
  alternates: { canonical: "/guides" }
};
```

Render a short introduction, a three-card grid sourced from `GUIDES`, and a final safety note. Each entire card must link to `/guides/${guide.slug}` and remain a single column on mobile.

- [ ] **Step 3: Verify the new index compiles**

Run: `npx.cmd tsc --noEmit`

Expected: PASS with no type errors.

- [ ] **Step 4: Commit the index and layout**

```bash
git add src/app/guides/page.tsx src/components/guides/guide-layout.tsx
git commit -m "feat: add guide content index"
```

---

### Task 3: Write the three original guide articles

**Files:**
- Create: `src/app/guides/four-axes/page.tsx`
- Create: `src/app/guides/reading-results/page.tsx`
- Create: `src/app/guides/decision-journal/page.tsx`

**Interfaces:**
- Consumes: `GuideLayout`, `GUIDES`, and `AXES`
- Produces: three static, indexable guide routes

- [ ] **Step 1: Add the four-axis guide**

Use metadata with canonical `/guides/four-axes`. The body must include:

- why axes are response preferences rather than ability scores;
- all four official axis names and both labels from `AXES`;
- one everyday decision example per axis;
- how to interpret `3:2`, `4:1`, and `5:0` as answer distributions;
- why `L/T` is not simply long-term/short-term investing and `D/C` is not analysis/gut skill;
- a closing prompt asking which cue the user notices first.

- [ ] **Step 2: Add the result-reading guide**

Use metadata with canonical `/guides/reading-results`. The body must include:

- the code order `준비 방식 → 시간 시야 → 판단 기준 → 확신 방식`;
- an `ALRD` walkthrough using `준비형`, `흐름형`, `기준형`, `근거형`;
- a method for comparing types that differ by one letter;
- how to turn strengths, habits, and cautions into observation questions;
- a clear statement that there is no best, profitable, or dangerous type;
- the fact that five questions per axis prevent ties in a normal 20-question completion.

- [ ] **Step 3: Add the decision-journal guide**

Use metadata with canonical `/guides/decision-journal`. The body must include the three-line record:

```text
1. 나는 무엇을 먼저 봤나?
2. 왜 그 순간 마음이 움직였나?
3. 다시 본다면 무엇을 한 번 더 확인하고 싶나?
```

Explain that the record captures a decision process rather than judging whether the outcome was correct. State that recent situations and experiences can change a retest result, and that shared result links show only the type's base description because they do not contain answer distributions.

- [ ] **Step 4: Review content against prohibited language**

Run:

```powershell
rg -n "추천 종목|맞춤 포트폴리오|수익률을 높|손실을 피|안전한 투자|성공하는 타입|매수 타이밍|매도 타이밍" src/app/guides
```

Expected: no matches in article claims. The common safety notice may contain negated terms such as `종목 추천` and is allowed only when clearly stating the service does not provide them.

- [ ] **Step 5: Run type checking and tests**

Run: `npx.cmd tsc --noEmit`

Expected: PASS.

Run: `npm.cmd test`

Expected: all tests PASS.

- [ ] **Step 6: Commit the articles**

```bash
git add src/app/guides/four-axes/page.tsx src/app/guides/reading-results/page.tsx src/app/guides/decision-journal/page.tsx
git commit -m "feat: publish Gaemitype guides"
```

---

### Task 4: Connect guides to the existing experience and sitemap

**Files:**
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/components/result/result-page-content.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: guide routes defined in Tasks 2 and 3
- Produces: internal navigation and sitemap discovery for all four guide routes

- [ ] **Step 1: Update global navigation**

In `site-header.tsx`, replace the redundant `홈` link with `가이드` linking to `/guides`. Keep the logo as the home link and keep `테스트 시작` unchanged.

In `site-footer.tsx`, add a `가이드` link between `서비스 소개` and `개인정보처리방침`.

- [ ] **Step 2: Add contextual links without new large sections**

- Home: add `투자 성향 가이드 읽기` beside or below the existing `/about` text link inside the existing lower information block.
- About: add a `/guides/four-axes` link below the axis grid.
- Result: import `Link` in `result-page-content.tsx` and add `내 결과를 더 잘 읽는 방법` linking to `/guides/reading-results` inside the existing reference section, before share actions.

- [ ] **Step 3: Correct the inaccurate tie explanation**

Replace `/about`'s statement about a predetermined tie rule with:

```text
각 질문의 두 선택지는 하나의 성향 축에 연결됩니다. 20개 답변을 축별로 합산하고, 더 자주 선택한 쪽을 조합해 타입 코드를 만듭니다. 각 축에는 5개 문항이 있어 정상적으로 모두 답하면 동점이 생기지 않습니다.
```

- [ ] **Step 4: Add all guide URLs to the sitemap**

Import `GUIDES` into `src/app/sitemap.ts`. Add `/guides` with priority `0.8`, then map the three manifest records to `/guides/${guide.slug}` with monthly change frequency and priority `0.7`.

- [ ] **Step 5: Run integration checks**

Run: `npm.cmd test`

Expected: all tests PASS.

Run: `npm.cmd run lint`

Expected: PASS with no ESLint errors.

- [ ] **Step 6: Commit navigation and sitemap changes**

```bash
git add src/components/layout/site-header.tsx src/components/layout/site-footer.tsx src/app/page.tsx src/app/about/page.tsx src/components/result/result-page-content.tsx src/app/sitemap.ts
git commit -m "feat: connect guides across the site"
```

---

### Task 5: Update documentation and perform release verification

**Files:**
- Modify: `README.md`
- Modify: `docs/planning/ia.md`
- Modify: `docs/planning/ads-monetization-plan.md`

**Interfaces:**
- Consumes: final public routes and navigation from Tasks 2-4
- Produces: current repository and deployment documentation

- [ ] **Step 1: Update README**

Add the guide section to the implemented feature list and project structure. Update the AdSense operating status to state that three original guides were added during review. Add `/guides` and all three article routes to the deployment access checklist.

- [ ] **Step 2: Update IA**

Add `가이드 목록` and three guide articles to the full structure. Document the header/footer links, contextual links from home/about/result, and the rule that quiz/calculating pages do not surface guide links.

- [ ] **Step 3: Update the monetization plan**

Update the current operating state to include the three completed guides and retain the statement that content improvements do not guarantee approval. Keep ads limited to the result footer after approval.

- [ ] **Step 4: Run full verification**

Run: `npm.cmd test`

Expected: all tests PASS.

Run: `npm.cmd run lint`

Expected: PASS with no ESLint errors.

Run: `npm.cmd run build`

Expected: Next.js production build succeeds and lists `/guides`, `/guides/four-axes`, `/guides/reading-results`, and `/guides/decision-journal` as static routes.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Perform final manual review**

- Verify all four guide URLs render and link to each other as designed.
- Verify home, about, result, header, and footer links.
- Verify mobile card and article readability.
- Compare guide paragraphs with `/about` and result text for duplication.
- Confirm no article gives investment instructions or promises outcomes.
- Confirm guide pages contain no ad slots.

- [ ] **Step 6: Commit documentation**

```bash
git add README.md docs/planning/ia.md docs/planning/ads-monetization-plan.md
git commit -m "docs: document guide content rollout"
```

- [ ] **Step 7: Report repository state**

Run: `git status --short`

Expected: clean working tree.

Run: `git log -6 --oneline`

Expected: the guide design, manifest, index, articles, integration, and documentation commits are visible in order.
