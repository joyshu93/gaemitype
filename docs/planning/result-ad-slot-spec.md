# 결과 페이지 하단 광고 슬롯 설계안

## 문서 목적

이 문서는 개미타입 결과 페이지에 광고를 붙일 때 필요한
`최소 구현 구조`와 `배치 기준`을 정리한다.

목표는 광고를 결과 경험과 분리하고, 나중에 실제 구현할 때
과도한 재설계 없이 바로 적용할 수 있게 만드는 것이다.

## 1차 적용 범위

- 적용 페이지: `/result`
- 배치 수: 1개
- 배치 위치: 결과 페이지 최하단
- 1차 광고 네트워크 가정: Google AdSense

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

## 컴포넌트 구조 제안

### 1차 컴포넌트

- `src/components/ads/ad-slot.tsx`
- `src/components/ads/adsense-script.tsx`

### 책임

`AdsenseScript`
- AdSense 스크립트 로드
- 중복 삽입 방지
- `next/script` 사용

`AdSlot`
- placement별 광고 렌더링
- 최소 높이 유지
- 광고 차단/미로드 시 fallback 처리
- 광고 on/off 환경변수 체크

## props 제안

```ts
type AdPlacement = "result-footer" | "home-footer";

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
NEXT_PUBLIC_ADSENSE_HOME_SLOT=0987654321
```

### 역할

- `NEXT_PUBLIC_ENABLE_ADS`
  - 전체 광고 on/off 제어
- `NEXT_PUBLIC_ADSENSE_CLIENT`
  - AdSense client ID
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT`
  - 결과 페이지 하단 슬롯 ID
- `NEXT_PUBLIC_ADSENSE_HOME_SLOT`
  - 차후 홈 하단 슬롯 ID

## 페이지별 include / exclude

### include

- `/result`
- 차후 필요 시 `/`

### exclude

- `/quiz`
- `/calculating`
- 기타 전환/집중 흐름 페이지

## 스크립트 삽입 방식

### 권장안

- 전역 layout 삽입보다 결과/홈에서만 조건부 삽입
- `next/script`
- 전략: `afterInteractive` 또는 `lazyOnload`

### 이유

- 질문 플로우에는 광고 스크립트 영향도 배제
- 초기 렌더링 성능 보호
- 광고 스크립트 로딩 범위 최소화

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

- 아무것도 렌더하지 않음

### 광고 차단기

- 빈 슬롯 대신 높이 유지용 래퍼만 남김
- 레이아웃 붕괴 방지

### 광고 미승인/미로드

- placeholder 문구 없이 조용히 숨기거나
- 내부 개발 모드에서만 debug label 표시

## 공유 결과 모드 주의사항

- shared mode(`/result?code=...`)에서도 광고는 동일 위치 유지
- 결과 코드/광고가 연관된 것처럼 읽히는 문구 금지
- 광고는 결과 설명과 시각적으로 분리

## 1차 구현 순서

1. 환경변수 설계
2. `AdsenseScript` 추가
3. `AdSlot` 컴포넌트 추가
4. `/result` 최하단 삽입
5. 광고 라벨/간격 정리
6. 모바일 및 광고 차단기 QA

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
