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
      "네 글자가 조합되는 순서와 비슷해 보이는 타입을 비교하는 방법, 결과를 현재 답변의 요약으로 읽는 기준을 정리합니다."
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
