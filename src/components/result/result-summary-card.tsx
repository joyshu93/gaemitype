import Image from "next/image";
import type { ResultSummary } from "@/domain/types";
import { getResultImagePath } from "@/lib/result-images";

type ResultSummaryCardProps = {
  result: ResultSummary;
};

export function ResultSummaryCard({ result }: ResultSummaryCardProps) {
  const imagePath = getResultImagePath(result.code);

  return (
    <section className="overflow-hidden rounded-[32px] bg-white shadow-card">
      <div className="bg-[linear-gradient(135deg,#14213d_0%,#1f3b68_58%,#5fb49c_100%)] px-6 py-7 text-white sm:px-8 sm:py-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Gaemitype Result
            </p>
            <div className="mt-4 inline-flex rounded-full bg-white/12 px-3 py-1 text-sm font-semibold tracking-[0.24em] text-white">
              {result.code}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              {result.profile.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/86 sm:text-lg">
              {result.profile.headline}
            </p>
          </div>
          <div className="hidden rounded-[24px] border border-white/15 bg-white/10 px-4 py-3 text-right text-sm text-white/75 sm:block">
            <p>내 판단 습관 요약</p>
            <p>4축 16타입</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-2xl rounded-[24px] border border-ink/10 bg-sand/40 p-4 sm:p-5">
          <Image
            src={imagePath}
            alt={`${result.profile.name} 결과 이미지`}
            width={1200}
            height={630}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <p className="mt-5 text-sm leading-7 text-ink/72 sm:text-base">
          {result.profile.description}
        </p>
      </div>
    </section>
  );
}
