"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/quiz/progress-bar";
import { QuestionCard } from "@/components/quiz/question-card";
import { QUESTIONS } from "@/data/questions";
import type { AnswerState } from "@/domain/types";
import { serializeAnswers } from "@/lib/quiz-params";
import { clearAnswers, loadAnswers, saveAnswers } from "@/lib/storage";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerState>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const shouldReset = params.get("reset") === "1";

      if (shouldReset) {
        clearAnswers();
        setAnswers({});
        setCurrentIndex(0);
        router.replace("/quiz");
        return;
      }

      const stored = loadAnswers();
      setAnswers(stored);

      const firstUnansweredIndex = QUESTIONS.findIndex(
        (question) => stored[question.id] === undefined
      );

      setCurrentIndex(
        firstUnansweredIndex === -1 ? QUESTIONS.length - 1 : firstUnansweredIndex
      );
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [router]);

  const question = QUESTIONS[currentIndex];
  const currentAnswer = question ? answers[question.id] : undefined;
  const orderedIds = useMemo(() => QUESTIONS.map((item) => item.id), []);

  const updateAnswer = (value: 0 | 1) => {
    const nextAnswers = {
      ...answers,
      [question.id]: value
    };

    setAnswers(nextAnswers);
    saveAnswers(nextAnswers);
  };

  const moveNext = () => {
    if (currentAnswer === undefined) {
      return;
    }

    if (currentIndex === QUESTIONS.length - 1) {
      const nextAnswers = {
        ...answers,
        [question.id]: currentAnswer
      };
      const serialized = serializeAnswers(nextAnswers, orderedIds);
      router.push(`/calculating?answers=${serialized}`);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const resetQuiz = () => {
    clearAnswers();
    setAnswers({});
    setCurrentIndex(0);
  };

  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 rounded-[24px] bg-white p-4 shadow-card">
        <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
      </div>

      <QuestionCard question={question} selectedValue={currentAnswer} onSelect={updateAnswer} />

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetQuiz}
            className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-ink/30"
          >
            처음부터
          </button>

          <button
            type="button"
            onClick={moveNext}
            disabled={currentAnswer === undefined}
            className="rounded-2xl bg-coral px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentIndex === QUESTIONS.length - 1 ? "결과 보기" : "다음"}
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-ink/60">
        결과는 투자 조언이 아니라, 현재의 판단 습관을 가볍게 돌아보는 참고용 요약입니다.
      </p>
    </div>
  );
}
