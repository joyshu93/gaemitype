"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/data/questions";
import { buildResultSummary } from "@/domain/scoring";
import { deserializeAnswers } from "@/lib/quiz-params";

type CalculatingRedirectProps = {
  serializedAnswers: string;
};

export function CalculatingRedirect({
  serializedAnswers
}: CalculatingRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const orderedIds = QUESTIONS.map((item) => item.id);
    const answers = deserializeAnswers(serializedAnswers, orderedIds);

    if (Object.keys(answers).length === 0) {
      router.replace("/quiz");
      return;
    }

    const result = buildResultSummary(answers, window.location.origin);
    const timeout = window.setTimeout(() => {
      router.replace(
        `/result?code=${result.code}&answers=${serializedAnswers}&source=answers`
      );
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [router, serializedAnswers]);

  return null;
}
