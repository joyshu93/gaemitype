import type { TypeCode } from "@/domain/types";

export type ResultShareCopyItem = {
  code: TypeCode;
  cardName: string;
  cardHeadline: string;
  cardShareLine: string;
};

export const RESULT_SHARE_COPY: ResultShareCopyItem[] = [
  {
    code: "ALRD",
    cardName: "기준설계형",
    cardHeadline: "기준부터 세우는 개미",
    cardShareLine: "흔들리기 전에 기준부터 잡는 편"
  },
  {
    code: "ALRC",
    cardName: "원칙항해형",
    cardHeadline: "방향부터 보는 개미",
    cardShareLine: "작은 파도보다 큰 방향이 더 중요함"
  },
  {
    code: "ALID",
    cardName: "탐색축적형",
    cardHeadline: "천천히 모아보는 개미",
    cardShareLine: "바로 결론보다 차곡차곡 쌓아보는 편"
  },
  {
    code: "ALIC",
    cardName: "감각개척형",
    cardHeadline: "믿으면 가는 개미",
    cardShareLine: "내 감이 맞다 싶으면 길게 가는 편"
  },
  {
    code: "ATRD",
    cardName: "점검기동형",
    cardHeadline: "움직여도 체크하는 개미",
    cardShareLine: "빠르게 움직여도 다시 확인은 꼭 함"
  },
  {
    code: "ATRC",
    cardName: "타이밍포착형",
    cardHeadline: "순간을 재는 개미",
    cardShareLine: "지금인가 싶을 때 제일 눈이 반짝임"
  },
  {
    code: "ATID",
    cardName: "반전탐색형",
    cardHeadline: "다르게 보는 개미",
    cardShareLine: "남들이 지나친 포인트가 자꾸 보임"
  },
  {
    code: "ATIC",
    cardName: "기회포착형",
    cardHeadline: "찰나를 잡는 개미",
    cardShareLine: "기회다 싶으면 몸이 먼저 움직이는 편"
  },
  {
    code: "PLRD",
    cardName: "흐름추적형",
    cardHeadline: "꾸준한 길을 보는 개미",
    cardShareLine: "급하지 않아도 흐름은 놓치지 않는 편"
  },
  {
    code: "PLRC",
    cardName: "집중추진형",
    cardHeadline: "한 방향을 미는 개미",
    cardShareLine: "방향이 보이면 힘 있게 밀어붙이는 편"
  },
  {
    code: "PLID",
    cardName: "낙관추종형",
    cardHeadline: "좋은 흐름을 믿는 개미",
    cardShareLine: "좋은 분위기엔 자연스럽게 오래 타는 편"
  },
  {
    code: "PLIC",
    cardName: "직진집중형",
    cardHeadline: "믿는 길을 미는 개미",
    cardShareLine: "확신이 생기면 묵직하게 끝까지 가는 편"
  },
  {
    code: "PTRD",
    cardName: "민첩조정형",
    cardHeadline: "빨리 맞춰가는 개미",
    cardShareLine: "흐름이 바뀌면 나도 빠르게 조정하는 편"
  },
  {
    code: "PTRC",
    cardName: "리듬포착형",
    cardHeadline: "속도에 강한 개미",
    cardShareLine: "리듬이 붙는 순간 더 세게 반응하는 편"
  },
  {
    code: "PTID",
    cardName: "유연탑승형",
    cardHeadline: "흐름을 잘 타는 개미",
    cardShareLine: "답답하게 버티기보다 자연스럽게 갈아탐"
  },
  {
    code: "PTIC",
    cardName: "순간포착형",
    cardHeadline: "기회를 낚아채는 개미",
    cardShareLine: "순간 분위기 변화에 가장 먼저 반응함"
  }
] as const;

export const RESULT_SHARE_COPY_MAP: Record<TypeCode, ResultShareCopyItem> =
  RESULT_SHARE_COPY.reduce(
    (acc, item) => {
      acc[item.code] = item;
      return acc;
    },
    {} as Record<TypeCode, ResultShareCopyItem>
  );

export function getResultShareCopy(code: TypeCode) {
  return RESULT_SHARE_COPY_MAP[code];
}
