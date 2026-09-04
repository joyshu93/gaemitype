import Link from "next/link";
import type { ReactNode } from "react";
import type { GuideSummary } from "@/data/guides.mts";

type GuideLayoutProps = {
  eyebrow: string;
  title: string;
  summary: string;
  relatedGuide: GuideSummary;
  children: ReactNode;
};

export function GuideLayout({
  eyebrow,
  title,
  summary,
  relatedGuide,
  children
}: GuideLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        href="/guides"
        className="inline-flex min-h-11 items-center text-sm font-medium text-ink/65 transition hover:text-ink"
      >
        가이드 목록
      </Link>

      <header className="mt-4 rounded-[32px] bg-white p-7 shadow-card sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-coral">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-ink/72">{summary}</p>
      </header>

      <article className="mt-6 space-y-6 rounded-[30px] bg-white p-7 shadow-card sm:p-9">
        {children}
      </article>

      <aside className="mt-6 rounded-[30px] border border-coral/20 bg-white p-7 text-sm leading-7 text-ink/70 sm:p-9">
        <p>
          개미타입은 현재 답변에서 드러난 판단 습관을 가볍게 정리한 참고용 콘텐츠입니다.
          투자 적합성이나 위험 감수 수준을 진단하지 않으며, 종목 추천·수익 보장·맞춤형 투자
          제안·매수나 매도 신호를 제공하지 않습니다.
        </p>
      </aside>

      <section className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
        <Link
          href={`/guides/${relatedGuide.slug}`}
          className="rounded-[26px] bg-sand p-6 transition hover:bg-sand/75"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">다음 가이드</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">{relatedGuide.title}</h2>
          <p className="mt-2 text-sm leading-6 text-ink/68">{relatedGuide.description}</p>
        </Link>
        <Link
          href="/quiz?reset=1"
          className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-ink/92"
        >
          테스트 시작하기
        </Link>
      </section>
    </div>
  );
}
