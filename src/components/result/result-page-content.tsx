import { AxisGrid } from "@/components/result/axis-grid";
import { ResultSummaryCard } from "@/components/result/result-summary-card";
import { ShareActions } from "@/components/result/share-actions";
import type { ResultSummary } from "@/domain/types";

type ResultPageContentProps = {
  result: ResultSummary;
};

export function ResultPageContent({ result }: ResultPageContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <ResultSummaryCard result={result} />

      <section className="mt-5 rounded-[24px] border border-ink/10 bg-white px-5 py-4 text-sm leading-6 text-ink/68 shadow-card">
        {result.mode === "answers"
          ? "내 답변을 바탕으로 정리한 결과예요. 아래 요약은 응답 흐름을 기준으로 보여드려요."
          : "공유 링크로 들어온 결과예요. 타입과 핵심 성향은 볼 수 있지만, 실제 응답이 없어서 세부 강도는 표시하지 않았어요."}
      </section>

      <div className="mt-5">
        <AxisGrid items={result.axisResults} />
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2">
        <article className="rounded-[28px] bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-ink">이런 점이 잘 보여요</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
            {result.profile.strengths.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-[28px] bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-ink">이럴 때 흔들릴 수 있어요</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72">
            {result.profile.cautions.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">이런 모습이 자주 보여요</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
          {result.profile.habits.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-5 rounded-[28px] border border-ink/10 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">참고로만 봐주세요</h2>
        <p className="mt-3 text-sm leading-7 text-ink/68">
          이 결과는 사용자의 투자 습관과 판단 성향을 가볍게 돌아보는 참고용 요약이에요.
          종목 추천, 수익 보장, 맞춤 투자 제안, 매수·매도 신호를 제공하지 않아요.
        </p>
        <div className="mt-6 border-t border-ink/8 pt-6">
          <ShareActions
            shareUrl={result.shareUrl}
            shareText={result.profile.shareText}
          />
        </div>
      </section>
    </div>
  );
}
