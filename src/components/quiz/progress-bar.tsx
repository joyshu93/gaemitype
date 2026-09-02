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
      <div
        className="h-2 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-label="테스트 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className="h-full rounded-full bg-coral transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
