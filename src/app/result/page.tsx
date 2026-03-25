import type { Metadata } from "next";
import Link from "next/link";
import { ResultPageContent } from "@/components/result/result-page-content";
import { getResultFromAnswersOrCode } from "@/domain/scoring";
import { buildResultMetadata } from "@/lib/result-og";
import { getSiteUrl } from "@/lib/site";

type ResultPageProps = {
  searchParams: Promise<{
    code?: string;
    answers?: string;
  }>;
};

export async function generateMetadata({
  searchParams
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const siteUrl = getSiteUrl();
  const code = params.code ?? "";
  const meta = buildResultMetadata(code, siteUrl);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: meta.url,
      images: meta.imageUrl
        ? [{ url: meta.imageUrl, width: 1200, height: 630, alt: meta.title }]
        : undefined
    },
    twitter: {
      card: meta.imageUrl ? "summary_large_image" : "summary",
      title: meta.title,
      description: meta.description,
      images: meta.imageUrl ? [meta.imageUrl] : undefined
    }
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const code = params.code ?? "";
  const answers = params.answers;
  const result = getResultFromAnswersOrCode({
    code,
    serializedAnswers: answers,
    baseUrl: ""
  });

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-3xl font-semibold text-ink">결과를 찾지 못했어요</h1>
        <p className="mt-4 text-base leading-7 text-ink/70">
          링크가 잘못되었거나 타입 코드가 비어 있어요. 테스트를 다시 시작해 주세요.
        </p>
        <Link
          href="/quiz?reset=1"
          className="mt-6 inline-flex rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white"
        >
          테스트 다시 시작
        </Link>
      </div>
    );
  }

  return <ResultPageContent result={result} />;
}
