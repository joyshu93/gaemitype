import { AXES } from "@/data/axes";
import type { AxisScore } from "@/domain/types";

type AxisGridProps = {
  items: AxisScore[];
};

function getAxisDefinition(key: AxisScore["key"]) {
  return AXES.find((axis) => axis.key === key);
}

function getMarkerPosition(item: AxisScore) {
  if (typeof item.leftScore === "number" && typeof item.rightScore === "number") {
    const total = item.leftScore + item.rightScore;

    if (total > 0) {
      return (item.rightScore / total) * 100;
    }
  }

  return item.selectedCode === item.leftCode ? 0 : 100;
}

export function AxisGrid({ items }: AxisGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const axis = getAxisDefinition(item.key);
        const leftLabel = axis?.left.shortLabel ?? item.leftCode;
        const rightLabel = axis?.right.shortLabel ?? item.rightCode;
        const markerPosition = getMarkerPosition(item);

        return (
          <article
            key={item.key}
            className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-card"
          >
            <p className="text-sm text-ink/45">{item.title}</p>
            <div className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-sm font-medium text-ink/80">
              {item.selectedCode} · {item.selectedLabel}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-medium text-ink/70">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
              </div>

              <div className="relative mt-3 h-3 rounded-full bg-sand/80">
                <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-coral/18" />
                <div className="absolute inset-y-0 right-0 w-1/2 rounded-full bg-sky/18" />
                <div
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-ink shadow-sm"
                  style={{
                    left: `clamp(10px, ${markerPosition}%, calc(100% - 10px))`
                  }}
                />
              </div>
            </div>

            <h2 className="mt-5 text-lg font-semibold text-ink">{item.selectedLabel}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{item.summary}</p>

            {typeof item.leftScore === "number" && typeof item.rightScore === "number" ? (
              <p className="mt-4 text-xs leading-5 text-ink/45">
                응답 기준 요약: {item.leftCode} {item.leftScore} / {item.rightCode}{" "}
                {item.rightScore}
              </p>
            ) : (
              <p className="mt-4 text-xs leading-5 text-ink/45">
                공유 결과에서는 세부 응답 강도 대신, 선택된 축 위치만 보여드려요.
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}
