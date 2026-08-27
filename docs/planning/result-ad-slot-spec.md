# 결과 페이지 하단 광고 슬롯 설계안

## 문서 목적

이 문서는 개미타입 결과 페이지에 광고를 붙일 때 필요한
`최소 구현 구조`와 `배치 기준`을 정리한다.

목표는 광고를 결과 경험과 분리하고, 현재 구현의 운영 기준을 명확히 하는 것이다.

## 1차 적용 범위

- 적용 페이지: `/result`
- 배치 수: 1개
- 배치 위치: 결과 페이지 최하단
- 배치 식별자: `result-footer`
- 광고 네트워크: Google AdSense

2026-08-27 기준 Google AdSense 선택과 `gaemitype.vercel.app` 사이트 소유권 확인은 완료됐다. 사이트 심사는 대기 중이며, 광고 슬롯은 비활성 상태다.

## 배치 원칙

광고는 아래 요소가 모두 끝난 뒤에만 노출한다.

1. 상단 결과 카드
2. 4축 요약
3. 강점 / 주의점 / 습관
4. 참고용 안내 문구
5. 공유 버튼 / 다시 테스트하기 CTA

즉, 광고는 `결과 해석 블록 밖`에 위치해야 한다.

## 금지 배치

- 결과 카드 바로 아래
- 4축 카드 중간
- 강점/주의점 리스트 사이
- 링크 복사 버튼 바로 위 또는 옆
- 공유 결과 모드에서 결과 상단 첫 화면 안

## 추천 DOM 위치

현재 구조상 [result-page-content.tsx](C:/Users/D-/Documents/Codex_Project/GaemigulTest/src/components/result/result-page-content.tsx) 기준으로:

- `ShareActions` 바로 아래
- 별도의 여백과 구분선 뒤
- 페이지 마지막 섹션으로 배치

## 시각 설계 원칙

- 광고 영역 상단에 `광고` 라벨 명시
- 결과 카드보다 대비가 강하지 않게 유지
- 서비스 카드처럼 보이는 디자인 금지
- 기본 여백:
  - 상단 `mt-8` 이상
  - 광고 슬롯 자체 패딩/배경은 최소
- 모바일에서 첫 화면을 차지하지 않게 제한

## 구현 구조

### 사용 파일

- `src/components/ads/ad-slot.tsx`
- `src/components/result/result-ad-section.tsx`
- `src/lib/ads.ts`
- `src/app/layout.tsx`

### 책임

`layout.tsx`
- `NEXT_PUBLIC_ADSENSE_CLIENT`가 있으면 모든 페이지에 `google-adsense-account` meta와 async AdSense 스크립트를 로드
- 이 전역 로드는 사이트 소유권 확인용이며, 광고 슬롯을 직접 렌더하지 않음

`AdSlot`
- placement별 광고 렌더링
- 최소 높이 유지
- 초기화 예외가 발생해도 결과 페이지 렌더링 유지
- `canRenderAdPlacement` 결과가 참일 때만 AdSense `ins` 요소 렌더링

`ResultAdSection`
- `result-footer`가 렌더 가능한 경우에만 결과 최하단의 광고 라벨과 슬롯 컨테이너를 렌더링

## props 제안

```ts
type AdPlacement = "result-footer";

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
  minHeight?: number;
};
```

## 환경변수 제안

```env
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_RESULT_SLOT=1234567890
```

### 역할

- `NEXT_PUBLIC_ENABLE_ADS`
  - 정확히 `true`일 때 광고 슬롯 노출 허용
- `NEXT_PUBLIC_ADSENSE_CLIENT`
  - AdSense client ID
  - 값이 있으면 전역 layout에서 소유권 확인용 meta와 스크립트를 로드
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`
  - 결과 페이지 최하단 `result-footer` 슬롯 ID

결과 하단 슬롯은 `NEXT_PUBLIC_ENABLE_ADS=true`, 유효한 `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`이 모두 있을 때만 렌더된다. 현재 심사 대기 상태에서는 `NEXT_PUBLIC_ENABLE_ADS=false`로 유지한다.

## 페이지별 include / exclude

### include

- `/result`

### exclude

- `/quiz`
- `/calculating`
- 기타 전환/집중 흐름 페이지

## 스크립트 삽입 방식

### 현재 구현

- `src/app/layout.tsx`가 `NEXT_PUBLIC_ADSENSE_CLIENT` 존재 여부만 확인해 전역 `<head>`에 meta와 async AdSense 스크립트를 삽입한다.
- `NEXT_PUBLIC_ENABLE_ADS=false`는 광고 슬롯 렌더링만 막으며, client ID가 설정된 경우 소유권 확인용 전역 스크립트는 유지된다.

### 이유

- 사이트 소유권 확인은 심사 기간에도 유지해야 한다.
- 광고 노출 여부는 결과 페이지의 단일 슬롯에서 독립적으로 제어한다.

## CLS / 성능 대응

- 슬롯은 렌더 전에도 고정 높이를 가진 래퍼 사용
- 광고 미로드 상태에서도 동일 높이 유지
- 결과 첫 화면 렌더 완료 후 광고 로드
- Core Web Vitals 비교:
  - LCP
  - CLS
  - INP

## fallback 상태

### 광고 off

- 결과 광고 섹션과 `ins` 슬롯을 렌더하지 않음

### 광고 차단기 / 미승인 / 미로드

- 현재 구현은 광고 요청 실패나 차단을 감지해 슬롯을 숨기지 않음
- 렌더 조건이 충족된 상태라면 광고 라벨과 컨테이너, `minHeight`가 적용된 고정 높이 빈 영역이 남을 수 있음
- 빈 영역의 크기와 표시 상태는 브라우저 및 광고 차단 환경별 수동 QA 대상

## 공유 결과 모드 주의사항

- shared mode(`/result?code=...`)에서도 광고는 동일 위치 유지
- 결과 코드/광고가 연관된 것처럼 읽히는 문구 금지
- 광고는 결과 설명과 시각적으로 분리

## 1차 구현 순서

1. `NEXT_PUBLIC_ADSENSE_CLIENT`를 설정해 소유권 확인 meta와 전역 스크립트를 로드한다.
2. AdSense 콘솔에서 사이트 심사 및 결과 슬롯 발급을 완료한다.
3. `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`을 설정한다.
4. `NEXT_PUBLIC_ENABLE_ADS=true`로 변경해 `result-footer`만 활성화한다.
5. 모바일 및 광고 차단기 QA를 진행한다.

## 수동 QA 체크리스트

- 결과 상단 첫 화면에 광고가 보이지 않는가
- 광고가 공유 CTA와 섞여 보이지 않는가
- 광고 차단기 환경에서 빈 공간이 과도하지 않은가
- 모바일에서 광고가 버튼/텍스트를 밀어내지 않는가
- shared mode와 answers mode 모두 레이아웃이 안정적인가

## 구현 보류 사항

- 질문 중간 광고
- 결과 페이지 다중 슬롯
- 자동 광고 전면 허용
- 광고 클릭/수익 최적화 실험
