"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full border border-gray-200 bg-white overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-orange transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Question {Math.min(current + 1, total)}/{total}
      </p>
    </div>
  );
}
