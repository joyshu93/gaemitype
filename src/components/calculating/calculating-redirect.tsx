"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/data/questions";
import { buildResultSummary } from "@/domain/scoring";
import { deserializeAnswers } from "@/lib/quiz-params";

type CalculatingRedirectProps = {
  serializedAnswers: string;
  questionVersion?: string | string[];
};

export function CalculatingRedirect({
  serializedAnswers,
  questionVersion
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
      const params = new URLSearchParams({ code: result.code, answers: serializedAnswers, source: "answers" });
      if (Array.isArray(questionVersion)) {
        questionVersion.forEach((version) => params.append("v", version));
      } else if (questionVersion !== undefined) {
        params.set("v", questionVersion);
      }
      router.replace(`/result?${params}`);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [router, serializedAnswers, questionVersion]);

  return null;
}
