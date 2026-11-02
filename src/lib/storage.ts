import type { AnswerState } from "@/domain/types";
import { QUESTION_VERSION } from "../data/questions.ts";

const ANSWERS_KEY = `gaemitype.answers.v${QUESTION_VERSION}`;

export function loadAnswers(): AnswerState {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(ANSWERS_KEY);
    return raw ? (JSON.parse(raw) as AnswerState) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: AnswerState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function clearAnswers() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ANSWERS_KEY);
  window.localStorage.removeItem("gaemitype.answers");
}
