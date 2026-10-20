import type { AxisLetter, TypeProfile } from "@/domain/types";

const SCENES = {
  AL: "전시를 보고 산책하려던 날, 도착하니 비가 내리는 장면이에요. 출발 전에 정리해둔 방문 순서와 실내 대안을 떠올려요. 바뀐 동선에서도 전시를 보고 쉬어가려던 하루의 흐름을 어떻게 이어갈지 살펴봐요.",
  AT: "전시를 보고 산책하려던 날, 도착하니 비가 내리는 장면이에요. 출발 전에 정리해둔 방문 순서와 실내 대안을 떠올려요. 지금 비를 피할 장소와 바로 바꿀 이동 순서를 살펴봐요.",
  PL: "전시를 보고 산책하려던 날, 도착하니 비가 내리는 장면이에요. 도착해서 주변의 실내 장소를 살펴보며 갈 곳의 순서를 정해봐요. 바뀐 동선에서도 전시를 보고 쉬어가려던 하루의 흐름을 어떻게 이어갈지 살펴봐요.",
  PT: "전시를 보고 산책하려던 날, 도착하니 비가 내리는 장면이에요. 도착해서 주변의 실내 장소를 살펴보며 갈 곳의 순서를 정해봐요. 지금 비를 피할 장소와 바로 바꿀 이동 순서를 살펴봐요.",
  RD: "사진 속 글자도 검색된다는 메모 앱을 살펴보는 장면이에요. 예전부터 중요하게 보던 ‘저장한 내용을 다시 찾기 쉬운가’를 먼저 떠올려요. 검색할 수 있는 자료의 종류와 결과가 표시되는 방식을 항목별로 보며 그 쓰임을 이해해요.",
  RC: "사진 속 글자도 검색된다는 메모 앱을 살펴보는 장면이에요. 예전부터 중요하게 보던 ‘저장한 내용을 다시 찾기 쉬운가’를 먼저 떠올려요. 찍어둔 안내문을 저장하고, 나중에 단어로 검색해 다시 여는 장면이 그려지면 그 쓰임을 이해해요.",
  ID: "사진 속 글자도 검색된다는 메모 앱을 살펴보는 장면이에요. ‘사진에 있는 글자까지 찾을 수 있네’라는 새 정보에 먼저 눈길이 가요. 검색할 수 있는 자료의 종류와 결과가 표시되는 방식을 항목별로 보며 그 쓰임을 이해해요.",
  IC: "사진 속 글자도 검색된다는 메모 앱을 살펴보는 장면이에요. ‘사진에 있는 글자까지 찾을 수 있네’라는 새 정보에 먼저 눈길이 가요. 찍어둔 안내문을 저장하고, 나중에 단어로 검색해 다시 여는 장면이 그려지면 그 쓰임을 이해해요.",
} as const;

const REFLECTIONS = {
  "A": "최근 나들이 한 번을 떠올려보세요. 출발 전에 정해둔 순서가 있었다면 무엇이었나요?",
  "P": "최근 나들이 한 번을 떠올려보세요. 현장에서 상황을 보고 정한 순서가 있었다면 무엇이었나요?",
  "L": "최근 하루 일정이 바뀐 때를 떠올려보세요. 그날 전체에서 계속 이어가고 싶었던 일은 무엇이었나요?",
  "T": "최근 하루 일정이 바뀐 때를 떠올려보세요. 그 순간 바로 바꾸고 싶었던 일은 무엇이었나요?",
  "R": "최근 새로운 선택지가 생겼을 때를 떠올려보세요. 그때도 중요하게 여긴 기존 기준이 있었다면 무엇이었나요?",
  "I": "최근 새로운 선택지가 생겼을 때를 떠올려보세요. 새로 알게 되어 눈길이 갔던 정보가 있었다면 무엇이었나요?",
  "D": "최근 새 앱을 써볼지 고민한 때를 떠올려보세요. 납득에 도움이 된 기능이나 이용 조건이 있었다면 무엇이었나요?",
  "C": "최근 새 앱을 써볼지 고민한 때를 떠올려보세요. 납득에 도움이 된 전체 사용 장면이 있었다면 무엇이었나요?"
} satisfies Record<AxisLetter, string>;

export const TYPE_PROFILES: TypeProfile[] = [
  { code: "ALRD", name: "기준설계형", headline: "기준표부터 펼치는 개미", description: "시작 전에 살펴볼 것을 정리하고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.AL, SCENES.RD], reflections: [REFLECTIONS.A, REFLECTIONS.L, REFLECTIONS.R, REFLECTIONS.D], shareText: "이번 타입은 기준설계형. 기준표부터 펼치는 개미예요." },
  { code: "ALRC", name: "원칙항해형", headline: "방향을 그려두는 개미", description: "시작 전에 살펴볼 것을 정리하고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.AL, SCENES.RC], reflections: [REFLECTIONS.A, REFLECTIONS.L, REFLECTIONS.R, REFLECTIONS.C], shareText: "이번 타입은 원칙항해형. 방향을 그려두는 개미예요." },
  { code: "ALID", name: "탐색축적형", headline: "새 단서를 차곡차곡 보는 개미", description: "시작 전에 살펴볼 것을 정리하고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 새로 들어온 정보에 눈길이 가며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.AL, SCENES.ID], reflections: [REFLECTIONS.A, REFLECTIONS.L, REFLECTIONS.I, REFLECTIONS.D], shareText: "이번 타입은 탐색축적형. 새 단서를 차곡차곡 보는 개미예요." },
  { code: "ALIC", name: "감각개척형", headline: "새 이야기를 길게 그려보는 개미", description: "시작 전에 살펴볼 것을 정리하고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 새로 들어온 정보에 눈길이 가며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.AL, SCENES.IC], reflections: [REFLECTIONS.A, REFLECTIONS.L, REFLECTIONS.I, REFLECTIONS.C], shareText: "이번 타입은 감각개척형. 새 이야기를 길게 그려보는 개미예요." },
  { code: "ATRD", name: "점검기동형", headline: "지금 조건부터 체크하는 개미", description: "시작 전에 살펴볼 것을 정리하고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.AT, SCENES.RD], reflections: [REFLECTIONS.A, REFLECTIONS.T, REFLECTIONS.R, REFLECTIONS.D], shareText: "이번 타입은 점검기동형. 지금 조건부터 체크하는 개미예요." },
  { code: "ATRC", name: "상황가늠형", headline: "기준에 지금 장면을 비춰보는 개미", description: "시작 전에 살펴볼 것을 정리하고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.AT, SCENES.RC], reflections: [REFLECTIONS.A, REFLECTIONS.T, REFLECTIONS.R, REFLECTIONS.C], shareText: "이번 타입은 상황가늠형. 기준에 지금 장면을 비춰보는 개미예요." },
  { code: "ATID", name: "단서점검형", headline: "새 단서부터 확인하는 개미", description: "시작 전에 살펴볼 것을 정리하고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 새로 들어온 정보에 눈길이 가며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.AT, SCENES.ID], reflections: [REFLECTIONS.A, REFLECTIONS.T, REFLECTIONS.I, REFLECTIONS.D], shareText: "이번 타입은 단서점검형. 새 단서부터 확인하는 개미예요." },
  { code: "ATIC", name: "변화준비형", headline: "바뀐 장면을 미리 그려보는 개미", description: "시작 전에 살펴볼 것을 정리하고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 새로 들어온 정보에 눈길이 가며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.AT, SCENES.IC], reflections: [REFLECTIONS.A, REFLECTIONS.T, REFLECTIONS.I, REFLECTIONS.C], shareText: "이번 타입은 변화준비형. 바뀐 장면을 미리 그려보는 개미예요." },
  { code: "PLRD", name: "흐름추적형", headline: "움직이며 기준을 챙기는 개미", description: "상황을 보며 방법을 정해가고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.PL, SCENES.RD], reflections: [REFLECTIONS.P, REFLECTIONS.L, REFLECTIONS.R, REFLECTIONS.D], shareText: "이번 타입은 흐름추적형. 움직이며 기준을 챙기는 개미예요." },
  { code: "PLRC", name: "집중추세형", headline: "내 기준으로 길게 그려보는 개미", description: "상황을 보며 방법을 정해가고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.PL, SCENES.RC], reflections: [REFLECTIONS.P, REFLECTIONS.L, REFLECTIONS.R, REFLECTIONS.C], shareText: "이번 타입은 집중추세형. 내 기준으로 길게 그려보는 개미예요." },
  { code: "PLID", name: "단서추적형", headline: "따라가며 새 근거를 보는 개미", description: "상황을 보며 방법을 정해가고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 새로 들어온 정보에 눈길이 가며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.PL, SCENES.ID], reflections: [REFLECTIONS.P, REFLECTIONS.L, REFLECTIONS.I, REFLECTIONS.D], shareText: "이번 타입은 단서추적형. 따라가며 새 근거를 보는 개미예요." },
  { code: "PLIC", name: "맥락탐색형", headline: "새 맥락을 길게 따라가는 개미", description: "상황을 보며 방법을 정해가고, 당장의 변화보다 이어지는 흐름을 보는 편이에요. 새로 들어온 정보에 눈길이 가며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.PL, SCENES.IC], reflections: [REFLECTIONS.P, REFLECTIONS.L, REFLECTIONS.I, REFLECTIONS.C], shareText: "이번 타입은 맥락탐색형. 새 맥락을 길게 따라가는 개미예요." },
  { code: "PTRD", name: "민첩조정형", headline: "지금 기준을 다시 맞춰보는 개미", description: "상황을 보며 방법을 정해가고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.PT, SCENES.RD], reflections: [REFLECTIONS.P, REFLECTIONS.T, REFLECTIONS.R, REFLECTIONS.D], shareText: "이번 타입은 민첩조정형. 지금 기준을 다시 맞춰보는 개미예요." },
  { code: "PTRC", name: "현장감각형", headline: "현장에서 내 기준을 떠올리는 개미", description: "상황을 보며 방법을 정해가고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 원래 중요하게 보던 기준을 떠올리며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.PT, SCENES.RC], reflections: [REFLECTIONS.P, REFLECTIONS.T, REFLECTIONS.R, REFLECTIONS.C], shareText: "이번 타입은 현장감각형. 현장에서 내 기준을 떠올리는 개미예요." },
  { code: "PTID", name: "유연탑승형", headline: "새 정보를 보며 조정하는 개미", description: "상황을 보며 방법을 정해가고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 새로 들어온 정보에 눈길이 가며, 구체적인 근거나 비교 항목이 정리되면 납득이 가요.", scenes: [SCENES.PT, SCENES.ID], reflections: [REFLECTIONS.P, REFLECTIONS.T, REFLECTIONS.I, REFLECTIONS.D], shareText: "이번 타입은 유연탑승형. 새 정보를 보며 조정하는 개미예요." },
  { code: "PTIC", name: "장면반응형", headline: "달라진 장면에 맞춰보는 개미", description: "상황을 보며 방법을 정해가고, 지금 상황에서 바꿀 부분에 관심을 두는 편이에요. 새로 들어온 정보에 눈길이 가며, 전체 맥락과 사용 장면이 그려지면 납득이 가요.", scenes: [SCENES.PT, SCENES.IC], reflections: [REFLECTIONS.P, REFLECTIONS.T, REFLECTIONS.I, REFLECTIONS.C], shareText: "이번 타입은 장면반응형. 달라진 장면에 맞춰보는 개미예요." }
];
