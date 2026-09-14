import type { AxisDefinition } from "@/domain/types";

export const AXES: AxisDefinition[] = [
  {
    key: "AP",
    title: "판단 준비 방식",
    left: {
      code: "A",
      label: "준비형",
      shortLabel: "준비형",
      description: "시작하기 전에 순서나 확인할 내용을 미리 정리해두는 편이에요."
    },
    right: {
      code: "P",
      label: "현장형",
      shortLabel: "현장형",
      description: "상황을 직접 보거나 해보면서 필요한 순서와 방법을 정해가는 편이에요."
    }
  },
  {
    key: "LT",
    title: "보는 시간 길이",
    left: {
      code: "L",
      label: "흐름형",
      shortLabel: "흐름형",
      description: "당장의 변화보다 시간이 지나도 이어갈 방향과 만족을 먼저 살펴보는 편이에요."
    },
    right: {
      code: "T",
      label: "타이밍형",
      shortLabel: "타이밍형",
      description: "지금 상황에서 달라진 점과 당장 바꿀 부분에 먼저 관심이 가는 편이에요."
    }
  },
  {
    key: "RI",
    title: "판단을 움직이는 기준",
    left: {
      code: "R",
      label: "기준형",
      shortLabel: "기준형",
      description: "새 선택이나 변화 앞에서 원래 중요하게 보던 기준을 먼저 떠올리는 편이에요."
    },
    right: {
      code: "I",
      label: "반응형",
      shortLabel: "반응형",
      description: "새 선택이나 변화 앞에서 새로 들어온 정보나 달라진 분위기에 먼저 눈길이 가는 편이에요."
    }
  },
  {
    key: "DC",
    title: "확신을 얻는 방식",
    left: {
      code: "D",
      label: "근거형",
      shortLabel: "근거형",
      description: "이유와 기능, 비교 항목처럼 구체적인 내용이 하나씩 정리될 때 납득이 가는 편이에요."
    },
    right: {
      code: "C",
      label: "감각형",
      shortLabel: "감각형",
      description: "정보가 이어지는 전체 맥락이나 실제 사용하는 장면이 그려질 때 납득이 가는 편이에요."
    }
  }
];
