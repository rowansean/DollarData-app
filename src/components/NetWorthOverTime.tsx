import { AreaChart } from "@tremor/react";

const chartdata = [
    {
        date: "Jan 22",
        'Net Worth': 2890,
    },
    {
        date: "Feb 22",
        'Net Worth': 2756,
    },
    {
        date: "Mar 22",
        'Net Worth': 3322,
    },
    {
        date: "Apr 22",
        'Net Worth': 3470,
    },
    {
        date: "May 22",
        'Net Worth': 3475,
    },
    {
        date: "Jun 22",
        'Net Worth': 3129,
    },
    {
        date: "Jul 22",
        'Net Worth': 3490,
    },
    {
        date: "Aug 22",
        'Net Worth': 2903,
    },
    {
        date: "Sep 22",
        'Net Worth': 2643,
    },
    {
        date: "Oct 22",
        'Net Worth': 2837,
    },
    {
        date: "Nov 22",
        'Net Worth': 2954,
    },
    {
        date: "Dec 22",
        'Net Worth': 3239,
    },
];


export function NetWorthOverTime() {
  return (
    <>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Net Worth"]}
        colors={["indigo", "cyan"]}
      />
    </>
  );
}
