import { ProgressCircle } from "@tremor/react";

export default function MonthlySavingsProgress({ actual, target }: {
  actual: number
  target: number
}) {
  const percentage = Math.round(Math.min(actual / target, 1) * 100);

  return <ProgressCircle value={percentage} size="md">
    <span className="text-xs font-medium text-slate-700">{percentage}%</span>
  </ProgressCircle>;
}
