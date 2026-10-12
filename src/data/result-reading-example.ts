import { AXES } from "./axes.ts";
import { QUESTIONS } from "./questions.ts";
import { buildResultSummary } from "../domain/scoring.ts";
import type { AnswerState } from "../domain/types.ts";

// Guide-only fictional choices. Never pass these to a personal result or storage.
export const RESULT_READING_ANSWERS: AnswerState = {
  q01: 0, q02: 1, q03: 0, q04: 1, q05: 0,
  q06: 0, q07: 1, q08: 0, q09: 1, q10: 0,
  q11: 0, q12: 1, q13: 0, q14: 1, q15: 0,
  q16: 0, q17: 1, q18: 0, q19: 1, q20: 0
};

const summary = buildResultSummary(RESULT_READING_ANSWERS, "");

// Expose only the guide's display data, without personal-result mode or share URL.
export const RESULT_READING_EXAMPLE = {
  code: summary.code,
  name: summary.profile.name,
  axes: AXES.map((axis, index) => {
    const score = summary.axisResults[index];
    const answers = QUESTIONS.flatMap((question, questionIndex) => {
      if (question.axis !== axis.key) return [];
      const value = RESULT_READING_ANSWERS[question.id];
      if (value === undefined) throw new Error(`Missing guide example answer: ${question.id}`);
      const option = question.options[value];
      return [{
        questionId: question.id,
        questionNumber: questionIndex + 1,
        prompt: question.prompt,
        selectedOptionLabel: option.label,
        selectedCode: option.code
      }];
    });
    return {
      key: axis.key,
      title: axis.title,
      left: { code: axis.left.code, label: axis.left.label, count: score.leftScore },
      right: { code: axis.right.code, label: axis.right.label, count: score.rightScore },
      selectedCode: score.selectedCode,
      examples: score.examples ?? [],
      answers
    };
  })
};
