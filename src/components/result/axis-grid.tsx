import { AXES } from "@/data/axes";
import { getAxisSelectionExplanation } from "@/domain/result-presentation";
import type { AxisScore, ResultSummary } from "@/domain/types";

type AxisGridProps = {
  items: AxisScore[];
  mode: ResultSummary["mode"];
};

function getAxisDefinition(key: AxisScore["key"]) {
  return AXES.find((axis) => axis.key === key);
}

function getMarkerPosition(item: AxisScore) {
  const total = (item.leftScore ?? 0) + (item.rightScore ?? 0);
  return total > 0 ? ((item.rightScore ?? 0) / total) * 100 : 0;
}

function getSharedExplanation(summary: string) {
  return summary.endsWith("편이에요.")
    ? `${summary.slice(0, -"편이에요.".length)}쪽을 뜻해요.`
    : summary;
}

export function AxisGrid({ items, mode }: AxisGridProps) {
  const isPersonal = mode === "answers";

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const axis = getAxisDefinition(item.key);

        return (
          <article
            key={item.key}
            className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-card"
          >
            <p className="text-sm text-ink/45">{item.title}</p>
            <h2 className="mt-3 text-lg font-semibold text-ink">
              {item.selectedCode} · {item.selectedLabel}
            </h2>

            {isPersonal ? (
              <>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.summary}</p>
                <p className="mt-4 text-sm leading-6 text-ink/72">
                  {getAxisSelectionExplanation(item)}
                </p>
                <div className="mt-4" aria-hidden="true">
                  <p className="text-xs font-medium text-ink/50">선택 횟수 분포</p>
                  <div className="relative mt-2 h-3 rounded-full bg-sand/80">
                    <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-coral/18" />
                    <div className="absolute inset-y-0 right-0 w-1/2 rounded-full bg-sky/18" />
                    <div
                      className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-ink shadow-sm"
                      style={{ left: `clamp(10px, ${getMarkerPosition(item)}%, calc(100% - 10px))` }}
                    />
                  </div>
                </div>

                {item.examples && item.examples.length > 0 ? (
                  <section className="mt-5 border-t border-ink/8 pt-5">
                    <h3 className="text-base font-semibold text-ink">이 축에 반영된 선택 예시</h3>
                    <div className="mt-3 space-y-4">
                      {item.examples.map((example) => {
                        const selectedAxisSide =
                          example.selectedCode === axis?.left.code ? axis.left : axis?.right;

                        return (
                          <blockquote key={example.questionId} className="rounded-2xl bg-sand/55 p-4 text-sm leading-6 text-ink/75">
                            <p className="font-medium text-ink">
                              Q{example.questionNumber}. {example.prompt}
                            </p>
                            <p className="mt-2">
                              고른 답변: <strong>{example.selectedOptionLabel}</strong> → {example.selectedCode}{" "}
                              {selectedAxisSide?.label}
                            </p>
                          </blockquote>
                        );
                      })}
                    </div>
                  </section>
                ) : null}
              </>
            ) : (
              <p className="mt-2 text-sm leading-6 text-ink/70">
                {getSharedExplanation(item.summary)}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}
