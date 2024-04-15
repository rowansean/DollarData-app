"use client";
import { AreaChart } from "@tremor/react";

const chartdata = [
  { date: "Jan 22", NetWorth: 2890 },
  { date: "Feb 22", NetWorth: 2756 },
  { date: "Mar 22", NetWorth: 3322 },
  { date: "Apr 22", NetWorth: 3470 },
  { date: "May 22", NetWorth: 3475 },
  { date: "Jun 22", NetWorth: 3129 },
  { date: "Jul 22", NetWorth: 3490 },
  { date: "Aug 22", NetWorth: 2903 },
  { date: "Sep 22", NetWorth: 2643 },
  { date: "Oct 22", NetWorth: 2837 },
  { date: "Nov 22", NetWorth: 2954 },
  { date: "Dec 22", NetWorth: 3239 },
];

export default function NetWorthMonthChange({
  className,
}: {
  className: string;
}) {
  return (
    <div className={`${className}`}>
      <AreaChart
        className="w-full h-16"
        data={chartdata}
        categories={["NetWorth"]}
        index="date"
        showLegend={false}
        showXAxis={false}
        showYAxis={false}
        showGridLines={false}
        showTooltip={false}
      />
    </div>
  );
}
