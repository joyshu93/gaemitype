type ProgressBarProps = {
  stepIndex: number;
  total: number;
};

export function ProgressBar({ stepIndex, total }: ProgressBarProps) {
  const current = stepIndex + 1;
  const value = Math.round((stepIndex / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-ink/70">
        <span>
          {current} / {total}
        </span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-coral transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
