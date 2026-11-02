# 개미타입

## 다른 PC에서 개발 이어가기 (2026-11-02)

최신 개발 소스와 필요한 개발 기록은 `codex/approved-experience` 브랜치를 기준으로 받습니다. `main`은 현재 운영 배포 기준입니다.

```powershell
git clone --branch codex/approved-experience https://github.com/joyshu93/gaemitype.git GaemigulTest
cd GaemigulTest
npm ci
npm run dev
```

이 브랜치는 10월 30일에 승인·구현한 문항 v2, 이전 답변 원문 보존, 개인 회고와 결과 제목 수정을 포함합니다. 기존 문서의 미커밋·미푸시 표기는 각 문서 작성 당시 상태입니다. 동기화 범위와 검증은 [11월 2일 기록](docs/reviews/2026-11-02-github-sync.md)을 따릅니다.


개미타입은 20개의 일상 질문에 담긴 판단 습관을 16개 개미 타입 중 하나로 보여주는 웹서비스입니다.

이 서비스는 투자 추천 서비스가 아닙니다.
- 종목 추천을 하지 않습니다.
- 수익을 보장하지 않습니다.
- 매수/매도 신호를 제공하지 않습니다.

서비스 목적은 아래 3가지입니다.
- 자기이해
- 재미
- 공유 가능한 결과 경험

현재 MVP 흐름:

`홈 -> 20문항 질문 -> 계산 -> 결과 -> 링크 공유`

보조 콘텐츠 흐름:

`가이드 목록 -> 개별 가이드 -> 타입 기본 설명 또는 테스트 시작`

배포 주소: [https://gaemitype.vercel.app](https://gaemitype.vercel.app)

## 기술 스택

- Next.js 16.3.3 App Router
- React 19.1.0
- TypeScript
- Tailwind CSS
- 정적 데이터 기반 구조
- Node.js 24.x
- Vercel 배포

## 현재 구현 상태

구현 완료:
- 홈 화면
- 서비스 소개 페이지
- 개인정보처리방침 페이지
- 질문 플로우
- 계산 페이지
- 결과 페이지
- 20문항 1문항 1화면 진행
- 선택지 선택 시 다음 문항으로 자동 이동
- 첫 문항 0%부터 마지막 문항 95%까지 표시하는 진행률
- localStorage 기반 답변 저장/복원
- 4축 점수 계산
- 16타입 결과 매핑
- 공유 링크 생성
- 공유 결과 모드와 응답 기반 결과 모드 분리
- 타입별 결과 이미지 연결
- 결과별 OG 메타데이터 최소 구현
- robots / sitemap / ads.txt
- Google Search Console 소유권 확인 파일
- Naver Search Advisor 소유권 확인 메타태그
- 가이드 목록 `/guides`
- 가이드 3종: 4가지 판단 축, 4글자 코드와 16가지 결과, 판단 습관 기록
- 결과 읽기 가이드의 가상 답변 20개·축별 집계·같은 타입의 3:2/5:0 해설과 접힌 전체 원문
- 홈 맛보기·결과 읽기 가이드에서 코드 전용 타입 기본 설명으로 연결
- 공용 가이드 본문 레이아웃과 가이드 간 관련 글 연결
- 헤더·푸터·홈·서비스 소개·결과 페이지의 가이드 링크

현재 결과 페이지에는 아래가 포함됩니다.
- 타입 코드 / 타입명 / 설명
- 개인 응답은 4축 선택 횟수와 실제 선택 예시, 코드 전용·답변 확인 실패는 선택된 축 뜻만 표시
- 최신 작업트리에는 개인 선택 예시를 연결한 회고 문단을 로컬 적용. 혼합 응답은 실제 두 선택, 한쪽 응답은 한 선택과 열린 질문을 표시하며 공유 결과에는 개인 회고가 없음
- 타입 공통 설명 장면 2개 / AP·LT·RI·DC별 돌아볼 질문 4개. 같은 비 오는 나들이·메모 앱을 두고 축별 초점을 구체화한 새 장면을 2026-10-20 운영에 반영
- 참고용 안내 문구
- 링크 복사 / 공유 문구 복사 / 다시 테스트하기

## 질문 진행 규칙

- 질문은 총 20문항이며 한 화면에 한 문항만 표시합니다.
- 선택지를 누르면 답변을 즉시 저장하고 다음 문항으로 이동합니다.
- 마지막 문항의 선택지를 누르면 계산 페이지로 자동 이동합니다.
- 이전 버튼으로 앞 문항에 돌아가 답변을 다시 선택할 수 있습니다.
- 최신 작업트리의 문항 버전은 `2`입니다. Q5는 메뉴 결정 시점, Q6는 변경을 보는 시간 범위를 묻도록 개정했습니다. id·순서·축·옵션 점수는 유지합니다.
- 새 개인 결과 URL은 `v=2`를 전달합니다. 버전 없는 이전 링크와 `v=1`은 구문항 원문을 유지하며, 미지원·중복 v는 개인 근거를 만들지 않습니다. 공유 링크에는 code만 남깁니다.
- 새 임시 저장 키는 `gaemitype.answers.v2`이며 구 응답을 새 문항에 자동 복원하지 않습니다. 처음부터·다시 테스트는 새 키와 구 키를 함께 초기화합니다. 향후 문항 의미 변경 시에도 버전과 과거 원문을 함께 관리해야 합니다.
- 진행률은 답변 완료율이 아니라 현재 문항 진입 시점을 기준으로 표시합니다.
  - 첫 문항: `0%`
  - 마지막 문항: `95%`
  - 마지막 답변 선택 후 계산 단계로 이동하며 질문 과정이 완료됩니다.

## 재시작 규칙

새 테스트를 시작하는 CTA는 모두 `/quiz?reset=1`로 진입합니다.

이 경로로 들어가면:
- 기존 localStorage 답변을 비우고
- 진행 상태를 초기화한 뒤
- 반드시 q01부터 새로 시작합니다.

퀴즈 화면 안의 `처음부터` 버튼도 같은 초기화 규칙을 적용합니다. 현재 URL은 유지한 채 localStorage 답변을 비우고, 메모리 답변을 초기화하며, 진행 인덱스를 `0`으로 되돌려 q01을 표시합니다.

적용 위치:
- 홈의 `테스트 시작하기`
- 헤더의 `테스트 시작`
- 결과 페이지의 `다시 테스트하기`
- 공유 결과 모드의 `다시 테스트하기`

## 결과 공유 구조

결과 페이지는 두 가지 모드로 동작합니다.

1. 응답 기반 결과 모드
- 예: `/result?code=PTIC&answers=...`
- 단일 유효 코드와 정확히 20자리 `0`/`1` answers가 현재 집계 코드와 일치할 때만 실제 선택 횟수와 예시를 보여줍니다.

2. 공유 결과 모드
- 예: `/result?code=PTIC`
- 타입 코드만으로 재현 가능한 정보만 보여줍니다.
- 실제 응답이 없거나 answers 확인에 실패하면 횟수·분포·선택 예시는 표시하지 않습니다.

입력과 표시 확인 규칙:

- 중복 `code`는 결과 없음으로, 중복 `answers`는 답변 확인 실패 공유 결과로 처리합니다.
- `source` 값은 판정에 사용하지 않습니다. 19·21자리 answers, `0`/`1` 이외 문자, 코드와 집계 결과의 불일치는 답변 확인 실패로 처리합니다.
- 실제 응답의 3:2·4:1은 축마다 좌·우 실제 선택 예시를 2개, 5:0은 선택된 방향의 예시 1개만 표시합니다.
- 코드 전용·답변 확인 실패 결과의 DOM에는 선택 횟수, 분포 트랙, 선택 예시가 없어야 합니다.
- 결과 화면은 390×844, 360×640, 데스크톱 1440px에서 상태가 이미지보다 먼저 읽히는지 확인합니다.
- 공식 이름은 7개 코드에서 바뀌었습니다: ATRC 상황가늠형, ATID 단서점검형, ATIC 변화준비형, PLID 단서추적형, PLIC 맥락탐색형, PTRC 현장감각형, PTIC 장면반응형.

가이드의 가상 답변은 설명 전용입니다. 결과 링크에 가상 `answers`를 전달하거나 localStorage에 저장하지 않습니다. 결과의 네 질문은 실제 응답 인용과 구분되는 타입 공통 질문입니다.

## OG 메타데이터 상태

현재 결과 페이지는 타입 코드에 따라 아래 메타데이터를 동적으로 생성합니다.
- `title`
- `description`
- `openGraph`
- `twitter`

관련 파일:
- `src/app/result/page.tsx`
- `src/lib/result-og.ts`
- `src/data/result-share-copy.ts`

## 결과 이미지 에셋

타입별 결과 이미지는 아래 경로에 있습니다.

- `public/results/ALRD.png`
- `public/results/ALRC.png`
- `...`
- `public/results/PTIC.png`

이미지 생성 프롬프트 기록:
- `docs/assets/result-image-prompts.md`

## AdSense 적용 상태

현재 코드베이스에는 AdSense 소유권 확인 코드와 결과 페이지 광고 슬롯 구조가 들어가 있습니다.

원칙:
- 1차 광고 위치는 `결과 페이지 최하단 1개 슬롯`
- `/quiz`, `/calculating`에는 광고를 넣지 않음
- `/guides`와 개별 가이드 페이지에는 광고를 넣지 않음
- 광고는 결과 해석과 공유 CTA가 끝난 뒤에만 노출

현재 운영 상태(2026-10-30 사용자 제공 화면 기준):
- Google AdSense 선택 완료
- `gaemitype.vercel.app` 사이트 소유권 확인 완료
- 10월 12일 콘텐츠 개선본 운영 반영 후 사용자가 재심사를 요청했고, `2026-10-20 11:42 KST` 갱신 상태도 `주의 필요 / 가치가 별로 없는 콘텐츠`. 개선 후 재심사도 반려된 것으로 확인
- `ads.txt` 상태는 `승인됨`. 사이트 콘텐츠 승인과는 별개이며 이전의 파일 미탐지는 현재 해결 과제로 제시하지 않음
- 반려 진단 후 기존 결과 장면을 구체화한 승인 원고(`22341be`)를 2026-10-20 운영에 반영하고 사용자 재심사 제출을 확인. 이후 제공된 화면의 `2026-10-30 08:27 KST` 갱신 상태도 `주의 필요 / 가치가 별로 없는 콘텐츠`로, 해당 재심사 역시 반려
- 10월 30일 공개 HTTP 점검에서 16타입의 새 장면 32개와 운영 canonical, robots·sitemap·ads.txt 정상 응답을 확인. Google이 실제 평가한 버전·문제 URL·문장은 미확인
- 후속으로 기획 배경을 주지 않은 독립 AI 3역할이 공개 사이트를 검토. Q5·Q6의 문항–축 연결, 실제 답변을 연결하는 회고 문단, 맞지 않는 결과를 보류하는 안내를 우선 개선 대상으로 정리. 실제 이용자 모집을 개선 작업의 필수 선행 조건으로 두지 않음
- 검토 중 서비스 소개, 개인정보처리방침, 크롤링 설정과 함께 독자 가이드 3종을 보강
- 사이트 승인 전까지 광고 슬롯은 비활성 상태이며 `NEXT_PUBLIC_ENABLE_ADS=false` 유지

최신 상태와 역할별 판단은 [2026-10-30 장면 개선 후 재심사 반려 검토](docs/reviews/2026-10-30-adsense-rejection-followup.md)에 기록했습니다. [10월 20일 반려 검토](docs/reviews/2026-10-20-adsense-rejection-followup.md)와 당시 제출·결과 대기 기록은 이전 시점의 이력으로 보존합니다. 이번에는 제출 사실을 다시 확인받지 않고 기존 사용자 확인과 새 화면을 연결했습니다. 제품 코드·배포·광고 설정·AdSense 계정은 변경하지 않았습니다.

[공개 사이트 독립 AI 콘텐츠 검토와 개선안](docs/reviews/2026-10-30-blind-public-content-review.md)은 이전 기획·심사 이력을 전달하지 않은 세 검토자의 최초 판단과 후속 문안 검토를 구분해 기록합니다. 이후 사용자가 Q5·Q6, 개인 회고, 결과 보류 안내와 제목 불일치 수정을 승인하여 최신 작업트리에 적용했습니다. 제목은 결과 링크의 metadata 사전 로딩 캐시가 다른 code에 재사용되는 경로를 피하도록 관련 링크 네 곳의 자동 prefetch를 끄고 실제 완주로 검증했습니다.

**2026-10-30 승인 수정은 개발 브랜치에 적용·검증됐으며 운영 미반영 상태입니다.** [구현·검증 기록](docs/reviews/2026-10-30-content-implementation-verification.md)에 테스트 24개·린트·빌드, 이전 원문 보존, 완주 후 title·OG·canonical, 모바일 회고·공유·경계 검증을 남겼습니다. 최신 코드와 개발 문서는 개인 GitHub의 `codex/approved-experience` 브랜치를 기준으로 받습니다. 2026-11-02 동기화에서 테스트 24개·린트·빌드를 다시 통과했으며 운영 main과 계정 심사 설정은 이번 이관 대상이 아닙니다.

후속 [결과 장면 비교와 교체 원고](docs/reviews/2026-10-20-result-scenes-copy-proposal.md)의 문안 8개를 사용자 승인에 따라 16타입에 적용했습니다. [로컬 적용·검증 기록](docs/reviews/2026-10-20-result-scenes-verification.md) 이후 별도 운영 승인에 따라 **2026-10-20 운영 반영 및 실제 사이트 검증을 완료했습니다.** [운영 검증 기록](docs/reviews/2026-10-20-result-scenes-production-verification.md)에 새 테스트 19개·린트·빌드, 배포 소스, 운영 16결과의 원고 32개 일치, 360px 세 모드·1440px·가이드 이동·메타 검증을 남겼습니다. 200% 확대·실제 휴대폰은 미확인입니다.

반려 점검 당시의 관찰·한계는 [2026-10-12 AdSense 반려 후속 검토](docs/reviews/2026-10-12-adsense-rejection-followup.md)에 기록했습니다. 당시에는 제품 코드·광고 환경변수·배포 설정을 변경하지 않았고, 이후 승인받은 구현과 운영 반영은 아래 기록으로 구분합니다.

[2026-10-12 콘텐츠 보완 수정 승인안](docs/reviews/2026-10-12-content-improvement-approval-plan.md)의 C1–C3를 구현하고 Preview에서 검증한 뒤, 사용자의 “운영 반영해줘” 승인에 따라 **2026-10-12 운영에 반영했습니다.** 공개 설명 변경, 네 축별 돌아볼 질문, 가이드의 가상 집계 사례와 코드 전용 결과 링크가 포함됩니다.

10월 12일 운영 제품 커밋은 `572c8e6`이었으며 Vercel Production 배포 `3WMkgXYFaeWvRE3ddHoawJYLUWvc`의 Ready와 운영 도메인 연결을 확인했습니다. [당시 운영 반영 기록](docs/reviews/2026-10-12-content-production-verification.md)에 테스트 19개·린트·빌드, 실제 운영 화면·메타·모바일 검증을 남겼습니다. [기존 구현·Preview 기록](docs/reviews/2026-10-12-content-improvement-verification.md)도 보존했습니다. **200% 브라우저 확대는 미확인**임을 고지한 뒤 운영 승인을 받았으며, 통과로 간주하지 않습니다.

현재 원격 `main`과 운영 제품은 `22341bea5e1a77176e88daf2421a7c808fbd135f`입니다. 기존 미커밋 파일을 보존하기 위해 루트 작업 폴더의 로컬 `main`은 `4321fe9`에 그대로 두었습니다. 최신 제품 소스와 커밋은 `.worktrees/approved-experience`에 있습니다. 루트에서 후속 작업하기 전 기존 변경을 보존하며 동기화해야 합니다.

2026-10-20에는 장면 데이터 한 파일만 커밋해 원격 main에 정상 fast-forward push했습니다. [Vercel 배포](https://vercel.com/joyshu93s-projects/gaemitype/FKdb4rpjDbegnisGHuUZrhZFS8jt)는 GitHub 연동 기록에서 동일 SHA·Production·완료 상태를 확인했고 운영 도메인에서 새 원고를 직접 확인했습니다. 당시 README와 검토 기록은 루트·작업트리에 로컬 문서로 보존했고, 2026-11-02 개발 브랜치 동기화에 함께 포함했습니다. 배포 작업에서 광고 설정과 AdSense 계정은 변경하지 않았고, 이후 사용자가 직접 검토 요청을 완료했다고 확인했습니다. [후속 기록](docs/reviews/2026-10-20-after-deployment-next-steps.md)에 제출 확인과 남은 항목을 남겼습니다.

환경변수의 실제 역할:
- `NEXT_PUBLIC_ADSENSE_CLIENT`가 있으면 전역 layout은 소유권 확인용 meta만 로드합니다.
- 결과 하단 `result-footer` 슬롯은 `NEXT_PUBLIC_ENABLE_ADS=true`, 유효한 `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`이 모두 있어야 렌더됩니다.
- AdSense 광고 스크립트도 위 조건이 충족된 결과 페이지에서만 로드됩니다.
- `NEXT_PUBLIC_ENABLE_ADS=false`일 때 광고 슬롯과 광고 요청 스크립트는 모두 로드되지 않습니다.

관련 파일:
- `src/app/layout.tsx`
- `src/lib/ads.ts`
- `src/components/ads/ad-slot.tsx`
- `src/components/result/result-ad-section.tsx`

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

PowerShell에서 `npm` 실행이 막히면:

```powershell
npm.cmd install
npm.cmd run dev
```

## 빌드 / 린트

```bash
npm run lint
npm test
npm run build
```

현재 기준:
- `npm run lint` 통과
- `npm run build` 통과

## 환경변수

기본 예시는 `.env.example`에 있습니다.

주요 변수:

```env
NEXT_PUBLIC_SITE_URL=https://gaemitype.vercel.app
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_RESULT_SLOT=1234567890
```

설명:
- `NEXT_PUBLIC_SITE_URL`: 배포 도메인
- `NEXT_PUBLIC_ENABLE_ADS`: 결과 페이지 하단 광고 슬롯 노출 on/off
- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSense client ID
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`: 결과 페이지 하단 슬롯 ID

현재 Vercel의 `NEXT_PUBLIC_SITE_URL`은 `https://gaemitype.vercel.app`으로 설정합니다. 실제 환경 변수 값은 저장소에 커밋하지 않고 Vercel 프로젝트 설정에서 관리합니다.

### 운영 배포와 미리보기

- 운영 환경은 `main`을 사용합니다. `codex/approved-experience` 브랜치는 별도의 Vercel Preview 환경으로 배포합니다.
- 운영 반영은 승인된 변경을 `main`에 병합·푸시한 뒤, Vercel Production 빌드가 Ready 상태이고 [운영 사이트](https://gaemitype.vercel.app)에 연결됐는지 확인하는 순서로 진행합니다.
- [미리보기](https://gaemitype-git-codex-approved-experience-joyshu93s-projects.vercel.app)는 Vercel 로그인이 필요하며, 운영 배포와 별개의 환경입니다.
- `NEXT_PUBLIC_SITE_URL`은 Vercel에서 **Preview / codex/approved-experience 브랜치에만** 위 미리보기 주소로 지정했습니다. Production 및 다른 브랜치의 값을 바꾸지 않습니다. 환경 변수 변경 후 같은 소스를 Preview로 다시 배포해야 반영됩니다.
- 결과의 canonical, `og:url`, `og:image`가 미리보기 도메인을 가리키는지 확인합니다. 보호된 Preview에 대한 외부 요청은 로그인 페이지로 이동하므로, 이를 실제 메신저 미리보기 검증으로 세지 않습니다.
- 광고 및 접근 보호 설정은 유지합니다. Production은 `https://gaemitype.vercel.app`을 사용합니다. Preview의 환경 값을 Production으로 복사하거나 Preview 주소로 빌드한 결과물을 그대로 승격하지 않습니다.
- 운영 배포 후 개인 응답 결과·코드 전용 공유 결과·잘못된 URL의 분기와 canonical·OG·robots·sitemap의 운영 도메인을 다시 확인합니다. 실제 모바일 기기·브라우저 200% 확대·화면 읽기 도구·메신저 미리보기는 각각 수행 여부를 따로 기록합니다.
- 배포 주소·커밋·직접 확인한 항목과 남은 검증은 [2026-09-14 Preview 검증 기록](docs/reviews/2026-09-14-preview-verification.md)에 남겼습니다.
- 2026-09-14 승인된 P1–P3를 운영에 반영했습니다. 2026-09-16 사용자는 휴대폰 완주·선택 예시 대조·링크 한 번 복사 후 붙여넣기와 열기의 확인을 완료했다고 회신했습니다. [운영 검증 기록](docs/reviews/2026-09-14-production-verification.md)에 메인의 관찰과 사용자 보고를 구분했고, 환경별 복사 신뢰성·확대·화면 읽기 도구·메신저 검증은 별도 확인 범위로 남겼습니다.

## 프로젝트 구조

- `src/app`: 라우팅 페이지
- `src/components`: UI 컴포넌트
- `src/components/ads`: 광고 관련 컴포넌트
- `src/components/guides`: 공용 가이드 본문 레이아웃
- `src/data`: 질문, 축, 결과, 공유 카피, 가이드 데이터
- `src/app/guides`: 가이드 목록과 정확히 3개의 개별 가이드 라우트
- `src/domain`: 타입 정의와 점수 계산 로직
- `src/lib`: storage, OG, 이미지 경로, 광고 설정 등 공용 유틸
- `public/results`: 타입별 결과 이미지
- `public/ads.txt`: AdSense 승인 판매자 선언
- `docs/planning`: PRD, IA, 타입 시스템, 광고 기획 문서
- `docs/assets`: 이미지 프롬프트 문서

## 배포 체크리스트

- `NEXT_PUBLIC_SITE_URL` 실제 도메인으로 설정
- 배포 환경의 Node.js 버전이 24.x인지 확인
- `npm run lint` 통과 확인
- `npm test` 통과 확인
- `npm run build` 통과 확인
- `/about`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/ads.txt` 접근 확인
- `/guides`, `/guides/four-axes`, `/guides/reading-results`, `/guides/decision-journal` 접근 확인
- 가이드 목록의 카드, 각 가이드의 관련 글, 헤더·푸터·홈·서비스 소개·결과 페이지의 가이드 링크 확인
- 가이드 페이지에 광고 슬롯이 없고, 결과 페이지 최하단 `result-footer`만 승인 후 광고 대상인지 확인
- `/google024ec439f41db987.html` 소유권 확인 파일 접근 확인
- 홈 HTML에 `naver-site-verification` 메타태그가 있는지 확인
- 첫 문항 진행률이 0%, 마지막 문항 진행률이 95%인지 확인
- 선택지 선택 시 다음 문항으로 자동 이동하는지 확인
- 마지막 답변 선택 후 계산 페이지로 이동하는지 확인
- 이전 버튼으로 돌아가 답변을 변경할 수 있는지 확인
- 퀴즈 화면의 `처음부터` 버튼이 localStorage 답변을 비우고 q01 및 진행률 `0%`로 돌아가는지 확인
- `/quiz` 완주 후 결과 진입 확인
- `/result?code=...` 직접 진입 확인
- 응답 없는 공유 결과에 선택 횟수·분포 막대·개인 선택 사례가 없고, 타입 코드의 뜻과 응답 없음 안내만 표시되는지 확인
- 모바일에서 결과 페이지 가독성 확인
- 실제 메신저에서 OG title / description / image 확인

## 알려진 점

- 로컬 Windows 환경에서 Next SWC 관련 경고가 보일 수 있습니다.
- 광고는 승인 후 슬롯 ID와 활성화 환경변수가 모두 설정돼야 렌더됩니다.
- AdSense 검토 상태는 외부 서비스 상태이므로 이 문서의 기준 날짜보다 실제 콘솔 상태를 우선합니다.
- 콘텐츠와 정책 페이지 보강이 승인을 보장하지는 않습니다. 2026-10-20 수정본 배포 후 요청한 재심사도 2026-10-30 같은 사유로 반려됐습니다. 기술 검증과 실제 이용자 효용·Google의 심사 판단은 구분합니다.
- OG 구조는 구현돼 있지만 실제 메신저별 미리보기 확인은 별도 QA가 필요합니다.
