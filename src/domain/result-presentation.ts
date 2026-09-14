import { AXES } from "../data/axes.ts";
import type { AxisScore, ResultSummary } from "./types.ts";

export function getAxisSelectionExplanation(item: AxisScore): string {
  if (typeof item.leftScore !== "number" || typeof item.rightScore !== "number") {
    return "";
  }

  const axis = AXES.find((candidate) => candidate.key === item.key);
  if (!axis) {
    return "";
  }

  const { leftScore, rightScore } = item;
  const leftLabel = axis.left.label;
  const rightLabel = axis.right.label;
  const counts = `이번 다섯 문항에서는 ${leftLabel} 선택 ${leftScore}개, ${rightLabel} 선택 ${rightScore}개였어요.`;

  if (leftScore === 3 && rightScore === 2) {
    return `${counts} 두 방식을 모두 골랐고 ${leftLabel} 선택이 하나 더 많았어요.`;
  }

  if (leftScore === 2 && rightScore === 3) {
    return `${counts} 두 방식을 모두 골랐고 ${rightLabel} 선택이 하나 더 많았어요.`;
  }

  if (leftScore === 4 && rightScore === 1) {
    return `${counts} ${leftLabel}을 더 많이 골랐고, ${rightLabel}을 고른 답변도 하나 있었어요.`;
  }

  if (leftScore === 1 && rightScore === 4) {
    return `${counts} ${rightLabel}을 더 많이 골랐고, ${leftLabel}을 고른 답변도 하나 있었어요.`;
  }

  if (leftScore === 5 && rightScore === 0) {
    return `${counts} 이번에는 모두 ${leftLabel} 쪽을 골랐지만, 다른 상황에서도 늘 같은 방식을 고른다는 뜻은 아니에요.`;
  }

  if (leftScore === 0 && rightScore === 5) {
    return `${counts} 이번에는 모두 ${rightLabel} 쪽을 골랐지만, 다른 상황에서도 늘 같은 방식을 고른다는 뜻은 아니에요.`;
  }

  return "";
}

export function getResultDisplayState(result: ResultSummary): {
  title: string;
  description: string;
  label: string;
} {
  if (result.mode === "answers") {
    return {
      title: "이번 답변으로 나온 결과",
      description:
        "이 링크의 답변에서 각 축마다 더 많이 고른 쪽을 모았어요. 같은 타입이어도 선택 횟수와 답변 내용은 다를 수 있어요.",
      label: "이번 답변 요약"
    };
  }

  if (result.sharedReason === "invalid-answers") {
    return {
      title: "타입 설명만 보여드려요",
      description:
        "답변 정보를 확인할 수 없어 타입 코드의 기본 설명만 보여드려요. 선택 횟수와 답변 사례는 표시하지 않아요.",
      label: "타입 기본 설명"
    };
  }

  return {
    title: "타입 설명만 담긴 링크",
    description: "이 링크에는 타입 코드만 있어요. 답변 내용과 선택 횟수는 포함되지 않아요.",
    label: "타입 기본 설명"
  };
}
