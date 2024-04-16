"use client";

import { ProgressCircle } from "@tremor/react";

export default function MonthlySavingsProgress({
  className,
  value,
}: {
  className: string;
  value: number;
}) {
  return (
    <div className={`${className}`}>
      <ProgressCircle value={Math.abs(value)} size="md">
        <span className="text-xs font-medium text-slate-700">{Math.abs(value)}%</span>
      </ProgressCircle>
    </div>
  );
}
