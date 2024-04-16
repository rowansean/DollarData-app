import { MonthlyCashFlow, currentMonth, formatCurrency } from "@/lib/types";
import { DeltaBar } from "@tremor/react";

export const CashFlowDeltaBar = ({ monthlyExpenses, monthlyIncome }: {
  monthlyExpenses: MonthlyCashFlow
  monthlyIncome: MonthlyCashFlow
}) => {
  const expenses = (monthlyExpenses.get(currentMonth.getTime()) ?? [])
    .reduce((previous, current) => previous + current.amountCents, 0);

  const income = (monthlyIncome.get(currentMonth.getTime()) ?? [])
    .reduce((previous, current) => previous + current.amountCents, 0);

  const cashFlow = expenses + income;
  const cashFlowAdjusted = cashFlow == 0 ? 1 : cashFlow;

  return <div>
    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
      <span>-{formatCurrency(expenses)}</span>
      <span>{formatCurrency(income)}</span>
    </p>

    <DeltaBar
      className="mt-3"
      isIncreasePositive={true}
      value={-Math.floor(expenses / cashFlowAdjusted * 100)}/>

    <DeltaBar
      className="mt-3"
      isIncreasePositive={true}
      value={Math.floor(income / cashFlowAdjusted * 100)}/>
  </div>;
};
