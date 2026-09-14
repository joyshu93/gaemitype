# Task 2 report

## Changed files

- `src/data/axes.ts`, `src/data/type-profiles.ts`, `src/domain/types.ts`: 승인된 8극 설명과 16개 정적 타입의 이름, 별칭, 대표 설명, 장면 2개, 돌아볼 질문 2개를 반영했다.
- `src/data/result-share-copy.ts`, `src/lib/result-og.ts`, `src/components/result/result-share-card.tsx`: 프로필을 공식 이름·별칭·공유 문구의 단일 원본으로 사용하고, OG 설명을 승인 템플릿으로 바꿨다.
- `src/components/result/axis-grid.tsx`, `result-summary-card.tsx`, `result-page-content.tsx`, `share-actions.tsx`: 개인 응답과 수치 없는 공유/확인 실패 상태를 명시적으로 나누고, 실제 질문·선택 예시 및 상태 순서를 반영했다.
- `src/app/page.tsx`, `about/page.tsx`, `guides/reading-results/page.tsx`, `guides/decision-journal/page.tsx`, `README.md`: 승인된 기존 안내 문구와 결과 모델을 동기화했다.
- `src/data/result-share-copy.test.mts`, `package.json`: 정식 공유 문구 소비자 회귀 테스트를 추가했다.

## Red / green evidence

- RED: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/data/result-share-copy.test.mts`는 기존 PTIC의 분리된 `cardName/cardHeadline/cardShareLine` 출력 때문에 실패했다.
- GREEN: 프로필 기반 공식 공유 문구로 바꾼 뒤 같은 명령이 통과했다.
- 전체 검증: `npx.cmd tsc --noEmit`, `npm.cmd test` (16/16), `npm.cmd run lint`, `NEXT_PUBLIC_SITE_URL=http://localhost:3017 npm.cmd run build`가 통과했다.

## Concerns

- 브라우저의 390×844/360×640 실제 레이아웃과 클립보드 동작 검증은 메인 에이전트가 실행 중인 localhost에서 별도로 수행한다.
- 현재 빌드의 Browserslist 데이터가 6개월 지났다는 기존 도구 경고가 남았으며, 의존성 변경은 이 작업 범위에 포함하지 않았다.

## Fix round 1

- 메인의 프로덕션 브라우저 재현에서 ShareActions가 서버에는 상대 URL, 첫 클라이언트 렌더에는 `window.location.origin`을 붙인 절대 URL을 출력해 React #418 hydration 오류가 났다. 표시값을 항상 `shareUrl`로 고정하고, 링크 복사 클릭 시에만 현재 origin을 붙이도록 수정했다. 공유 문구 복사와 코드 전용 URL의 범위는 유지한다.
- README에 중복 매개변수, 엄격한 answers 입력, 실제 예시 수, 수치 없는 공유 DOM, 390/360/1440 화면, 7개 공식 이름의 검증 항목을 추가했다.
- 4축 가이드는 이미 `AXES` 데이터를 소비해 새 8극 설명과 동기화되므로 변경하지 않았다.
- 수정 후 `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/data/result-share-copy.test.mts` 1/1, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `NEXT_PUBLIC_SITE_URL=http://localhost:3017 npm.cmd run build`가 통과했다. 빌드는 기존 Browserslist 데이터 경고만 출력했다.

## Commit

- `feat: clarify approved result experience` (local commit; final hash is supplied in the task handoff)
