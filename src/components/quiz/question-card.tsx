import type { Question } from "@/domain/types";

type QuestionCardProps = {
  question: Question;
  selectedValue?: 0 | 1;
  onSelect: (value: 0 | 1) => void;
};

export function QuestionCard({
  question,
  selectedValue,
  onSelect
}: QuestionCardProps) {
  return (
    <section className="rounded-[28px] bg-white p-6 shadow-card sm:p-8">
      <div className="mb-5 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink/70">
        {question.helper}
      </div>
      <h1 className="text-2xl font-semibold leading-tight text-ink sm:text-3xl">
        {question.prompt}
      </h1>
      <div className="mt-8 grid gap-3">
        {question.options.map((option) => {
          const active = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-2xl border px-4 py-4 text-left text-base transition ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-ink/10 bg-sand/60 text-ink hover:border-ink/30 hover:bg-sand"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
