import type { AnswerState } from "@/domain/types";

export function serializeAnswers(answers: AnswerState, orderedIds: string[]) {
  return orderedIds
    .map((id) => {
      const value = answers[id];
      return value === undefined ? "_" : String(value);
    })
    .join("");
}

export function deserializeAnswers(serialized: string, orderedIds: string[]): AnswerState {
  const answers: AnswerState = {};

  orderedIds.forEach((id, index) => {
    const value = serialized[index];
    if (value === "0" || value === "1") {
      answers[id] = Number(value) as 0 | 1;
    }
  });

  return answers;
}
