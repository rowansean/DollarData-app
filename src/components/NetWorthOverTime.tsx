import { MonthlyCashFlow, formatCurrency } from "@/lib/types";
import { AreaChart } from "@tremor/react";

function formatMonthAndYear(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    year: "2-digit"
  });
}

export function NetWorthOverTime({ monthlyExpenses, monthlyIncome }: {
  monthlyExpenses: MonthlyCashFlow
  monthlyIncome: MonthlyCashFlow
}) {
  const months = Array.from(
    new Set([ ...Array.from(monthlyExpenses.keys()), ...Array.from(monthlyIncome.keys())])
  );

  const data = months.map(month => ({
    month: formatMonthAndYear(month),
    Expenses: (monthlyExpenses.get(month) ?? [])
      .reduce((previous, current) => previous + current.amountCents, 0),

    Income: (monthlyIncome.get(month) ?? [])
      .reduce((previous, current) => previous + current.amountCents, 0)
  }));

  return <AreaChart
    categories={["Expenses", "Income"]}
    className="mt-4 h-72"
    colors={["indigo", "cyan"]}
    data={data}
    index="month"
    valueFormatter={amountCents => formatCurrency(amountCents)}
    yAxisWidth={65}/>;
}
