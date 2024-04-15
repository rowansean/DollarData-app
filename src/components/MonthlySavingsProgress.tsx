"use client";

import { ProgressCircle } from "@tremor/react";

export default function MonthlySavingsProgress({
  className,
}: {
  className: string;
}) {
  return (
    <div className={`${className}`}>
      <ProgressCircle value={75} size="md">
        <span className="text-xs font-medium text-slate-700">75%</span>
      </ProgressCircle>
    </div>
  );
}
