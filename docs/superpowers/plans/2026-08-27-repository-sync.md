# Repository Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 배포된 개미타입 구현을 기준으로 기획 문서, 광고 명세, 환경 예시와 로컬 의존성을 일치시킨다.

**Architecture:** `src/data`와 실제 라우트 동작을 제품 문서의 단일 기준으로 사용한다. AdSense는 소유권 확인용 전역 스크립트와 결과 하단 광고 슬롯 노출을 분리해 설명하고, 로컬 패키지는 선언 버전과 설치 버전을 맞춘다.

**Tech Stack:** Next.js 16.3.3, React 19.1.0, TypeScript, Tailwind CSS, Node.js 24.x, Google AdSense, Vercel

**Spec:** `AGENTS.md`, `src/data/questions.ts`, `src/data/type-profiles.ts`, `src/data/axes.ts`, `src/domain/scoring.ts`, `src/app/layout.tsx`, `src/lib/ads.ts`

## Global Constraints

- 서비스는 투자 추천, 종목 추천, 수익 보장, 매수·매도 신호를 제공하지 않는다.
- 4축, 20문항, 16타입 구조와 기존 타입 코드는 유지한다.
- 현재 사용자 흐름은 `홈 -> 질문 선택 즉시 자동 진행 -> 계산 -> 결과 -> 링크 공유`다.
- 질문 진행률은 첫 문항 0%, 마지막 문항 95%다.
- AdSense 광고 슬롯은 결과 페이지 최하단 1개만 허용한다.
- AdSense 심사 중에는 광고 슬롯을 비활성화하고 소유권 확인 스크립트는 유지한다.
- 이미지 생성 프롬프트 원문은 수정하지 않고 현재 타입명 매핑만 추가한다.
- npm 프로덕션 감사에서 취약점이 보고되지 않는 Next.js 16.3.3을 사용한다.
- 현재 로컬 검증 환경과 Vercel의 장기 지원 주기에 맞춰 Node.js를 `24.x`로 고정한다.

---

### Task 1: 제품 문서 동기화

**Files:**
- Modify: `docs/planning/prd.md`
- Modify: `docs/planning/ia.md`
- Modify: `docs/planning/question-spec.md`
- Modify: `docs/planning/type-system.md`
- Modify: `docs/planning/branding.md`
- Modify: `docs/assets/result-image-prompts.md`

**Interfaces:**
- Consumes: 현재 질문, 축, 타입 프로필과 결과 페이지 구현
- Produces: 구현과 일치하는 제품 기준 문서

- [x] PRD의 초안·미확정 표현을 현재 구현 상태로 교체한다.
- [x] IA에 선택 즉시 자동 진행, 0~95% 진행률, 링크·공유 문구 복사를 반영한다.
- [x] question spec의 20문항을 `src/data/questions.ts`와 동일하게 맞춘다.
- [x] type system의 축 이름과 16개 타입명을 실제 데이터와 맞추고 정상 완주에서는 동점이 없음을 명시한다.
- [x] branding 문서의 완료된 다음 라운드 항목을 현재 카피 기준으로 정리한다.
- [x] 이미지 프롬프트 원문 위에 기존 프롬프트명과 현재 서비스 타입명의 매핑을 추가한다.

### Task 2: 광고 및 환경 구조 동기화

**Files:**
- Modify: `docs/planning/ads-monetization-plan.md`
- Modify: `docs/planning/result-ad-slot-spec.md`
- Modify: `.env.example`
- Modify: `README.md`
- Delete: `src/components/ads/adsense-script.tsx`

**Interfaces:**
- Consumes: `src/app/layout.tsx`, `src/lib/ads.ts`, `src/components/ads/ad-slot.tsx`
- Produces: 소유권 확인과 광고 노출을 구분한 운영 문서

- [x] AdSense 선택 완료, 소유권 확인 완료, 사이트 심사 대기 상태를 기록한다.
- [x] `NEXT_PUBLIC_ADSENSE_CLIENT`는 전역 확인 스크립트, `NEXT_PUBLIC_ENABLE_ADS`와 슬롯 ID는 광고 노출 제어에 사용한다고 명시한다.
- [x] 홈 슬롯과 홈 슬롯 환경변수 제안을 1차 명세에서 제거한다.
- [x] `.env.example`의 사이트 URL을 `https://gaemitype.vercel.app`으로 맞춘다.
- [x] 사용되지 않는 `AdsenseScript` 컴포넌트와 README 참조를 제거한다.
- [x] 퀴즈의 화면 내 `처음부터` 초기화 QA 항목을 README에 추가한다.

### Task 3: 의존성 동기화

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `eslint.config.mjs`
- Modify: `tsconfig.json`
- Modify: `next-env.d.ts`
- Modify: `.gitignore`
- Refresh: `node_modules`

**Interfaces:**
- Consumes: npm audit가 취약점 0건으로 검증한 Next.js 16.3.3과 PostCSS 8.5.26
- Produces: `next`와 `eslint-config-next` 16.3.3이 일치하는 로컬 설치 상태

- [x] `next`와 `eslint-config-next`를 16.3.3으로 맞춘다.
- [x] `postcss`를 8.5.26으로 맞추고 감사 가능한 하위 의존성을 안전 버전으로 갱신한다.
- [x] Next 16 native flat config와 생성 TypeScript 설정을 반영한다.
- [x] Node.js 엔진을 `24.x`로 고정한다.
- [x] `npm install`로 잠금 파일과 로컬 설치를 갱신한다.
- [x] `npm ls next eslint-config-next --depth=0`이 오류 없이 두 패키지의 16.3.3을 출력하는지 확인한다.
- [x] `npm audit --omit=dev`가 프로덕션 취약점 0건을 보고하는지 확인한다.
- [x] 전체 `npm audit`가 개발 의존성을 포함해 취약점 0건을 보고하는지 확인한다.

### Task 4: 통합 검증

**Files:**
- Verify: all modified files

**Interfaces:**
- Consumes: Tasks 1~3 결과
- Produces: 배포 가능한 문서·의존성 상태

- [x] `npm run lint`를 실행한다.
- [x] `npm run build`를 실행한다.
- [x] `git diff --check`를 실행한다.
- [x] 수정 범위에 사용자 작업이 덮어써지지 않았는지 확인한다.
