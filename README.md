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

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- 정적 데이터 기반 구조
- Vercel 배포

## 현재 구현 상태

구현 완료:
- 홈 화면
- 질문 플로우
- 계산 페이지
- 결과 페이지
- 20문항 1문항 1화면 진행
- localStorage 기반 답변 저장/복원
- 4축 점수 계산
- 16타입 결과 매핑
- 공유 링크 생성
- 공유 결과 모드와 응답 기반 결과 모드 분리
- 타입별 결과 이미지 연결
- 결과별 OG 메타데이터 최소 구현

현재 결과 페이지에는 아래가 포함됩니다.
- 타입 코드 / 타입명 / 설명
- 4축 요약
- 강점 / 주의점 / 자주 보이는 습관
- 참고용 안내 문구
- 링크 복사 / 공유 문구 복사 / 다시 테스트하기

## 재시작 규칙

새 테스트를 시작하는 CTA는 모두 `/quiz?reset=1`로 진입합니다.

이 경로로 들어가면:
- 기존 localStorage 답변을 비우고
- 진행 상태를 초기화한 뒤
- 반드시 q01부터 새로 시작합니다.

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

## AdSense 1차 계획

현재 코드베이스에는 AdSense 구현 뼈대가 들어가 있습니다.

원칙:
- 1차 광고 위치는 `결과 페이지 최하단 1개 슬롯`
- `/quiz`, `/calculating`에는 광고를 넣지 않음
- 광고는 결과 해석과 공유 CTA가 끝난 뒤에만 노출

관련 파일:
- `src/lib/ads.ts`
- `src/components/ads/adsense-script.tsx`
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
npm run build
```

현재 기준:
- `npm run lint` 통과
- `npm run build` 통과

## 환경변수

기본 예시는 `.env.example`에 있습니다.

주요 변수:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example.com
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_RESULT_SLOT=1234567890
```

설명:
- `NEXT_PUBLIC_SITE_URL`: 배포 도메인
- `NEXT_PUBLIC_ENABLE_ADS`: 광고 on/off
- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSense client ID
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`: 결과 페이지 하단 슬롯 ID

## 프로젝트 구조

- `src/app`: 라우팅 페이지
- `src/components`: UI 컴포넌트
- `src/components/ads`: 광고 관련 컴포넌트
- `src/data`: 질문, 축, 결과, 공유 카피 데이터
- `src/domain`: 타입 정의와 점수 계산 로직
- `src/lib`: storage, OG, 이미지 경로, 광고 설정 등 공용 유틸
- `public/results`: 타입별 결과 이미지
- `docs/planning`: PRD, IA, 타입 시스템, 광고 기획 문서
- `docs/assets`: 이미지 프롬프트 문서

## 배포 체크리스트

- `NEXT_PUBLIC_SITE_URL` 실제 도메인으로 설정
- `npm run lint` 통과 확인
- `npm run build` 통과 확인
- `/quiz` 완주 후 결과 진입 확인
- `/result?code=...` 직접 진입 확인
- 공유 결과 모드에서 세부 강도가 숨겨지는지 확인
- 모바일에서 결과 페이지 가독성 확인
- 실제 메신저에서 OG title / description / image 확인

## 알려진 점

- 로컬 Windows 환경에서 Next SWC 관련 경고가 보일 수 있습니다.
- 광고는 환경변수가 없으면 렌더되지 않습니다.
- OG 구조는 구현돼 있지만 실제 메신저별 미리보기 확인은 별도 QA가 필요합니다.
