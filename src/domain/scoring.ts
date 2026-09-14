import { AXES } from "../data/axes.ts";
import { QUESTIONS } from "../data/questions.ts";
import { TYPE_PROFILES } from "../data/type-profiles.ts";
import type {
  AnswerState,
  AxisDefinition,
  AxisLetter,
  AxisScore,
  ResultSummary,
  TypeCode
} from "@/domain/types";

const profilesByCode = new Map(TYPE_PROFILES.map((profile) => [profile.code, profile]));

function resolveAxisScore(axis: AxisDefinition, answers: AnswerState): AxisScore {
  const axisQuestions = QUESTIONS.filter((question) => question.axis === axis.key);
  let leftScore = 0;
  let rightScore = 0;
  let tieBreaker = 0;

  for (const question of axisQuestions) {
    const answer = answers[question.id];
    if (answer === undefined) {
      continue;
    }

    const selected = question.options[answer];
    if (selected.code === axis.left.code) {
      leftScore += 1;
      tieBreaker += 1;
    } else {
      rightScore += 1;
      tieBreaker -= 1;
    }
  }

  let selectedCode: AxisLetter = axis.left.code;
  if (rightScore > leftScore) {
    selectedCode = axis.right.code;
  } else if (rightScore === leftScore && tieBreaker < 0) {
    selectedCode = axis.right.code;
  }

  const selectedLabel =
    selectedCode === axis.left.code ? axis.left.label : axis.right.label;
  const summary =
    selectedCode === axis.left.code ? axis.left.description : axis.right.description;

  return {
    key: axis.key,
    selectedCode,
    leftCode: axis.left.code,
    rightCode: axis.right.code,
    leftScore,
    rightScore,
    title: axis.title,
    selectedLabel,
    summary,
    examples: getAxisExamples(axis, answers)
  };
}

function getAxisExamples(axis: AxisDefinition, answers: AnswerState) {
  const axisQuestions = QUESTIONS.filter((question) => question.axis === axis.key);
  const selectedQuestions = axisQuestions.flatMap((question) => {
    const answer = answers[question.id];
    if (answer === undefined) {
      return [];
    }

    const selected = question.options[answer];
    return [{
      direction: selected.code === axis.left.code ? "left" : "right",
      example: {
        questionId: question.id,
        questionNumber: QUESTIONS.indexOf(question) + 1,
        prompt: question.prompt,
        selectedOptionLabel: selected.label,
        selectedCode: selected.code
      }
    }];
  });

  const left = selectedQuestions.find((item) => item.direction === "left");
  const right = selectedQuestions.find((item) => item.direction === "right");

  return [left?.example, right?.example].filter(
    (example): example is NonNullable<typeof example> => example !== undefined
  );
}

export function buildResultSummary(answers: AnswerState, baseUrl: string): ResultSummary {
  const axisResults = AXES.map((axis) => resolveAxisScore(axis, answers));
  const code = axisResults.map((axis) => axis.selectedCode).join("") as TypeCode;
  const profile = profilesByCode.get(code);

  if (!profile) {
    throw new Error(`Unknown type code: ${code}`);
  }

  return {
    code,
    profile,
    axisResults,
    shareUrl: `${baseUrl}/result?code=${code}`,
    mode: "answers"
  };
}

export function getSharedResultFromCode(code: string, baseUrl: string): ResultSummary | null {
  const profile = profilesByCode.get(code as TypeCode);
  if (!profile || code.length !== 4) {
    return null;
  }

  const axisResults = code.split("").map((selectedCode, index) => {
    const axis = AXES[index];
    const isLeft = selectedCode === axis.left.code;

    return {
      key: axis.key,
      selectedCode: selectedCode as AxisLetter,
      leftCode: axis.left.code,
      rightCode: axis.right.code,
      title: axis.title,
      selectedLabel: isLeft ? axis.left.label : axis.right.label,
      summary: isLeft ? axis.left.description : axis.right.description
    } satisfies AxisScore;
  });

  return {
    code: code as TypeCode,
    profile,
    axisResults,
    shareUrl: `${baseUrl}/result?code=${code}`,
    mode: "shared",
    sharedReason: "code-only"
  };
}

export function getResultFromAnswersOrCode(params: {
  code: string | string[] | undefined;
  serializedAnswers?: string | string[];
  baseUrl: string;
}): ResultSummary | null {
  const { code, serializedAnswers, baseUrl } = params;

  if (typeof code !== "string") {
    return null;
  }

  const sharedResult = getSharedResultFromCode(code, baseUrl);
  if (!sharedResult) {
    return null;
  }

  if (serializedAnswers === undefined) {
    return sharedResult;
  }

  if (typeof serializedAnswers !== "string" || !/^[01]{20}$/.test(serializedAnswers)) {
    return { ...sharedResult, sharedReason: "invalid-answers" };
  }

  const answers: AnswerState = {};
  QUESTIONS.forEach((question, index) => {
    answers[question.id] = Number(serializedAnswers[index]) as 0 | 1;
  });

  const result = buildResultSummary(answers, baseUrl);
  return result.code === code
    ? result
    : { ...sharedResult, sharedReason: "invalid-answers" };
}
