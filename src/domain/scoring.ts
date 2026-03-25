import { AXES } from "@/data/axes";
import { QUESTIONS } from "@/data/questions";
import { TYPE_PROFILES } from "@/data/type-profiles";
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
    summary
  };
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
    mode: "shared"
  };
}

export function getResultFromAnswersOrCode(params: {
  code: string;
  serializedAnswers?: string;
  baseUrl: string;
}): ResultSummary | null {
  const { code, serializedAnswers, baseUrl } = params;

  if (serializedAnswers) {
    const orderedIds = QUESTIONS.map((item) => item.id);
    const answers: AnswerState = {};

    orderedIds.forEach((id, index) => {
      const value = serializedAnswers[index];
      if (value === "0" || value === "1") {
        answers[id] = Number(value) as 0 | 1;
      }
    });

    const hasAllAnswers = QUESTIONS.every((question) => answers[question.id] !== undefined);
    if (hasAllAnswers) {
      const result = buildResultSummary(answers, baseUrl);
      if (result.code === code) {
        return result;
      }
    }
  }

  return getSharedResultFromCode(code, baseUrl);
}
