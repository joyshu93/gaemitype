import type { AxisDefinition } from "@/domain/types";

export const AXES: AxisDefinition[] = [
  {
    key: "AP",
    title: "판단 준비 방식",
    left: {
      code: "A",
      label: "준비형",
      shortLabel: "준비형",
      description: "움직이기 전에 기준과 흐름을 먼저 정리해두면 더 편안한 쪽이에요."
    },
    right: {
      code: "P",
      label: "현장형",
      shortLabel: "현장형",
      description: "상황을 보면서 그때그때 더 맞는 쪽으로 조정하는 편이에요."
    }
  },
  {
    key: "LT",
    title: "보는 시간 길이",
    left: {
      code: "L",
      label: "흐름형",
      shortLabel: "흐름형",
      description: "짧은 흔들림보다 조금 더 긴 흐름과 방향을 보는 편이에요."
    },
    right: {
      code: "T",
      label: "타이밍형",
      shortLabel: "타이밍형",
      description: "지금 구간의 변화와 리듬을 빠르게 읽는 쪽에 가까워요."
    }
  },
  {
    key: "RI",
    title: "판단을 움직이는 기준",
    left: {
      code: "R",
      label: "기준형",
      shortLabel: "기준형",
      description: "내 기준과 원래 세운 규칙을 먼저 확인해야 마음이 놓이는 편이에요."
    },
    right: {
      code: "I",
      label: "반응형",
      shortLabel: "반응형",
      description: "새로 들어온 신호와 분위기 변화에 더 빠르게 반응하는 편이에요."
    }
  },
  {
    key: "DC",
    title: "확신을 얻는 방식",
    left: {
      code: "D",
      label: "근거형",
      shortLabel: "근거형",
      description: "숫자나 자료처럼 확인 가능한 근거가 있어야 더 확신이 생겨요."
    },
    right: {
      code: "C",
      label: "감각형",
      shortLabel: "감각형",
      description: "전체 맥락과 감각이 맞아떨어질 때 더 확신이 붙는 편이에요."
    }
  }
];
