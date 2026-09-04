import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides.mts";

export const metadata: Metadata = {
  title: "투자 성향 가이드 | 개미타입",
  description: "개미타입의 4가지 판단 축과 16타입 결과를 읽고 판단 습관을 돌아보는 가이드입니다.",
  alternates: { canonical: "/guides" }
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="max-w-3xl rounded-[32px] bg-white p-7 shadow-card sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-coral">Guide</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          결과를 가볍게 읽는 방법
        </h1>
        <p className="mt-5 text-base leading-8 text-ink/72">
          개미타입의 4가지 판단 축과 16타입 결과를 현재 답변에서 드러난 판단 습관의
          요약으로 읽어보세요.
        </p>
      </header>

      <section className="mt-6 grid gap-5 sm:grid-cols-3" aria-label="개미타입 가이드">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-[30px] bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">
              {guide.eyebrow}
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-snug text-ink">{guide.title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">{guide.description}</p>
            <span className="mt-6 inline-flex text-sm font-semibold text-ink underline decoration-coral/50 underline-offset-4">
              가이드 읽기
            </span>
          </Link>
        ))}
      </section>

      <aside className="mt-6 rounded-[30px] border border-coral/20 bg-white p-7 text-sm leading-7 text-ink/70 sm:p-9">
        개미타입 가이드는 현재 답변에서 드러난 판단 습관을 가볍게 돌아보기 위한
        참고용 콘텐츠입니다. 투자 적합성이나 위험 감수 수준을 진단하지 않으며, 종목
        추천·수익 보장·맞춤형 투자 제안·매수나 매도 신호를 제공하지 않습니다.
      </aside>
    </div>
  );
}
