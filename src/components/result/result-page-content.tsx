import Link from "next/link";
import { AxisGrid } from "@/components/result/axis-grid";
import { ResultAdSection } from "@/components/result/result-ad-section";
import { ResultSummaryCard } from "@/components/result/result-summary-card";
import { ShareActions } from "@/components/result/share-actions";
import type { ResultSummary } from "@/domain/types";

type ResultPageContentProps = {
  result: ResultSummary;
};

export function ResultPageContent({ result }: ResultPageContentProps) {
  const isPersonal = result.mode === "answers";

  return (
    <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-10">
      <ResultSummaryCard result={result} />

      {isPersonal ? (
        <section className="mt-5 rounded-[24px] border border-ink/10 bg-white px-5 py-4 text-sm leading-6 text-ink/68 shadow-card">
          숫자는 이번 답변에서 각 방향을 고른 횟수예요. 성격의 강도, 검사 정확도, 투자 능력을 뜻하지 않아요.
          <p className="mt-2">총 5개 답변 중, 각 방향에서 먼저 나온 선택을 하나씩 보여드려요.</p>
        </section>
      ) : null}

      <div className="mt-5">
        <AxisGrid items={result.axisResults} mode={result.mode} />
      </div>

      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">이 타입을 장면으로 보면</h2>
        <p className="mt-3 text-sm leading-7 text-ink/68">
          아래는 같은 타입에 공통으로 제공되는 설명이에요. 장면은 타입의 뜻을 풀어 쓴 예시이며, 실제 선택 기록은 아니에요.
          {isPersonal ? " 이번 답변의 차이는 위의 선택 횟수와 사례에서 확인할 수 있어요." : ""}
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
          {result.profile.scenes.map((scene) => <li key={scene}>- {scene}</li>)}
        </ul>
      </section>

      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">돌아볼 질문</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
          {result.profile.reflections.map((reflection) => <li key={reflection}>- {reflection}</li>)}
        </ul>
        <p className="mt-4 text-sm leading-7 text-ink/60">
          실제로 떠오르는 장면만 생각해봐도 괜찮아요. 두 방식의 경험이 모두 있어야 하는 것은 아니에요.
        </p>
      </section>

      <section className="mt-5 rounded-[28px] border border-ink/10 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">참고로만 봐주세요</h2>
        <p className="mt-3 text-sm leading-7 text-ink/68">
          이 결과는 사용자의 투자 습관과 판단 성향을 가볍게 돌아보는 참고용 요약이에요. 종목 추천, 수익 보장, 맞춤형 투자 제안, 매수나 매도 신호를 제공하지 않아요.
        </p>
        <div className="mt-6 border-t border-ink/8 pt-6">
          <Link href="/guides/reading-results" className="inline-flex font-medium text-ink underline decoration-coral/50 underline-offset-4">
            내 결과를 더 잘 읽는 방법
          </Link>
          <ShareActions shareUrl={result.shareUrl} shareText={result.profile.shareText} />
        </div>
      </section>

      <ResultAdSection />
    </div>
  );
}
