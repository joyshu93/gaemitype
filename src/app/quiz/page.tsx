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
  const [isAdvancing, setIsAdvancing] = useState(false);

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
  const orderedIds = useMemo(() => QUESTIONS.map((item) => item.id), []);

  const updateAnswer = (value: 0 | 1) => {
    if (!question || isAdvancing) {
      return;
    }

    setIsAdvancing(true);

    const nextAnswers = {
      ...answers,
      [question.id]: value
    };

    setAnswers(nextAnswers);
    saveAnswers(nextAnswers);

    window.setTimeout(() => {
      if (currentIndex === QUESTIONS.length - 1) {
        const serialized = serializeAnswers(nextAnswers, orderedIds);
        router.push(`/calculating?answers=${serialized}`);
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      setIsAdvancing(false);
    }, 80);
  };

  const resetQuiz = () => {
    clearAnswers();
    setAnswers({});
    setCurrentIndex(0);
    setIsAdvancing(false);
  };

  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 rounded-[24px] bg-white p-4 shadow-card">
        <ProgressBar stepIndex={currentIndex} total={QUESTIONS.length} />
      </div>

      <QuestionCard
        question={question}
        selectedValue={answers[question.id]}
        disabled={isAdvancing}
        onSelect={updateAnswer}
      />

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setIsAdvancing(false);
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
          }}
          disabled={currentIndex === 0 || isAdvancing}
          className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>

        <button
          type="button"
          onClick={resetQuiz}
          disabled={isAdvancing}
          className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          처음부터
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-ink/60">
        결과는 투자 조언이 아니라, 현재의 판단 흐름을 가볍게 돌아보는 참고용
        요약이에요.
      </p>
    </div>
  );
}
