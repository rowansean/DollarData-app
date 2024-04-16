import { MonthlyCashFlow } from "@/lib/types";
import { AreaChart } from "@tremor/react";

export default function NetWorthMonthChange({
  className,
  monthlyExpenses,
  monthlyIncome
}: {
  className: string
  monthlyExpenses: MonthlyCashFlow
  monthlyIncome: MonthlyCashFlow
}) {
  const months = Array.from(
    new Set([ ...Array.from(monthlyExpenses.keys()), ...Array.from(monthlyIncome.keys())])
  ).toSorted((month1, month2) => month1 - month2);

  const data: { month: number, "Net Worth": number }[] = [];

  months.forEach(month => {
    const expenses = (monthlyExpenses.get(month) ?? [])
      .reduce((previous, current) => previous + current.amountCents, 0);

    const income = (monthlyIncome.get(month) ?? [])
      .reduce((previous, current) => previous + current.amountCents, 0);

    const cashFlow = income - expenses;

    data.push({
      month,
      "Net Worth": (data[data.length - 1]?.["Net Worth"] ?? 0) + cashFlow
    })
  });

  return <div className={`${className}`}>
    <AreaChart
      categories={["Net Worth"]}
      className="w-full h-16"
      data={data}
      index="month"
      showGridLines={false}
      showTooltip={false}
      showLegend={false}
      showXAxis={false}
      showYAxis={false}/>
  </div>;
}
