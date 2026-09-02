# 개미타입

개미타입은 20문항 질문을 바탕으로 개인의 투자 습관과 판단 스타일을 16개 타입 중 하나로 보여주는 웹서비스입니다.

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

현재 결과 페이지에는 아래가 포함됩니다.
- 타입 코드 / 타입명 / 설명
- 4축 요약
- 강점 / 주의점 / 자주 보이는 습관
- 참고용 안내 문구
- 링크 복사 / 공유 문구 복사 / 다시 테스트하기

## 질문 진행 규칙

- 질문은 총 20문항이며 한 화면에 한 문항만 표시합니다.
- 선택지를 누르면 답변을 즉시 저장하고 다음 문항으로 이동합니다.
- 마지막 문항의 선택지를 누르면 계산 페이지로 자동 이동합니다.
- 이전 버튼으로 앞 문항에 돌아가 답변을 다시 선택할 수 있습니다.
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
- 실제 응답을 바탕으로 4축 요약과 비율을 보여줍니다.

2. 공유 결과 모드
- 예: `/result?code=PTIC`
- 타입 코드만으로 재현 가능한 정보만 보여줍니다.
- 실제 응답이 없으므로 세부 강도는 표시하지 않습니다.

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
- 광고는 결과 해석과 공유 CTA가 끝난 뒤에만 노출

현재 운영 상태(2026-09-02 기준):
- Google AdSense 선택 완료
- `gaemitype.vercel.app` 사이트 소유권 확인 완료
- 첫 사이트 검토에서 `게시자 콘텐츠가 없는 화면 / 가치가 별로 없는 콘텐츠` 사유로 보완 요청
- 서비스 소개, 개인정보처리방침, 크롤링 설정, `ads.txt`를 보강해 재심사 준비 중
- 승인 전까지 광고 슬롯은 비활성 상태이며 `NEXT_PUBLIC_ENABLE_ADS=false` 유지

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

## 프로젝트 구조

- `src/app`: 라우팅 페이지
- `src/components`: UI 컴포넌트
- `src/components/ads`: 광고 관련 컴포넌트
- `src/data`: 질문, 축, 결과, 공유 카피 데이터
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
- 첫 문항 진행률이 0%, 마지막 문항 진행률이 95%인지 확인
- 선택지 선택 시 다음 문항으로 자동 이동하는지 확인
- 마지막 답변 선택 후 계산 페이지로 이동하는지 확인
- 이전 버튼으로 돌아가 답변을 변경할 수 있는지 확인
- 퀴즈 화면의 `처음부터` 버튼이 localStorage 답변을 비우고 q01 및 진행률 `0%`로 돌아가는지 확인
- `/quiz` 완주 후 결과 진입 확인
- `/result?code=...` 직접 진입 확인
- 공유 결과 모드에서 세부 강도가 숨겨지는지 확인
- 모바일에서 결과 페이지 가독성 확인
- 실제 메신저에서 OG title / description / image 확인

## 알려진 점

- 로컬 Windows 환경에서 Next SWC 관련 경고가 보일 수 있습니다.
- 광고는 승인 후 슬롯 ID와 활성화 환경변수가 모두 설정돼야 렌더됩니다.
- AdSense 검토 상태는 외부 서비스 상태이므로 이 문서의 기준 날짜보다 실제 콘솔 상태를 우선합니다.
- 콘텐츠와 정책 페이지 보강이 승인을 보장하지는 않으며, 배포 후 AdSense 재심사가 필요합니다.
- OG 구조는 구현돼 있지만 실제 메신저별 미리보기 확인은 별도 QA가 필요합니다.
