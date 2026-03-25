type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const value = Math.round((current / total) * 100);

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
