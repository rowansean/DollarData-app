"use client";

import { BadgeDelta, Card } from "@tremor/react";
import { CashFlowDeltaBar } from "@/components/CashFlowDeltaBar";
import MonthlySavingsProgress from "@/components/MonthlySavingsProgress";
import NetWorthMonthChange from "@/components/NetWorthMonthChange";
import { NetWorthOverTime } from "@/components/NetWorthOverTime";
import { useMonthlyExpenses, useMonthlyIncome } from "@/hooks/useMonthlyCashFlow";
import { MonthlyCashFlow, currentMonth, formatCurrency } from "@/lib/types";

function currentMonthFormatted(): string {
  return new Date(currentMonth).toLocaleString("en-US", {
    month: "long"
  });
}

function sumMonthlyCashFlow(monthlyCashFlow: MonthlyCashFlow): number {
  return Array
    .from(monthlyCashFlow.values())
    .flat()
    .map(item => item.amountCents)
    .reduce((previous, current) => previous + current, 0);
}

function todayFormatted(): string {
  return new Date().toLocaleString("en-US", {
    dateStyle: "short"
  });
}

export default function Home() {
	const [monthlyExpenses, _1] = useMonthlyExpenses();
  const [monthlyIncome, _2] = useMonthlyIncome();
  const currentMonthExpenses = (monthlyExpenses.get(currentMonth.getTime()) ?? [])
    .reduce((previous, current) => previous + current.amountCents, 0);

  const currentMonthIncome = (monthlyIncome.get(currentMonth.getTime()) ?? [])
    .reduce((previous, current) => previous + current.amountCents, 0);

  const currentMonthNetCashFlow = currentMonthIncome - currentMonthExpenses;
  const currentMonthNetCashFlowTarget = currentMonthIncome * 0.2;
  const netWorth = sumMonthlyCashFlow(monthlyIncome) - sumMonthlyCashFlow(monthlyExpenses);
  const netWorthChange = currentMonthNetCashFlow / (netWorth - currentMonthNetCashFlow) * 100;
  const netWorthChangeFormatted = `${netWorthChange >= 0 ? "+" : ""}${netWorthChange.toFixed(1)}%`;

  return (
    <main className="w-screen min-h-screen flex flex-col gap-5 p-5 md:p-10">
      <div className=" w-full flex flex-col gap-3">
        <div className="flex gap-2">
          <h3 className="font-light">View your Net Worth</h3>
          <BadgeDelta
            deltaType="moderateIncrease"
            isIncreasePositive={true}
            size="xs">
            {netWorthChangeFormatted}
          </BadgeDelta>
        </div>
        <h1 className="text-6xl font-bold">{formatCurrency(netWorth)}</h1>
        <p className="text-sm font-light">
          your total assets minus liabilities as of {todayFormatted()}
        </p>
      </div>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex justify-between items-center">
          <div className="h-fit text-left">
            <p className="font-light text-sm">This Month&apos;s Change</p>
            <p className="font-medium text-lg">{currentMonthFormatted()}</p>
          </div>

          <NetWorthMonthChange
            className="w-28"
            monthlyExpenses={monthlyExpenses}
            monthlyIncome={monthlyIncome}/>

          <div>
            <p>{formatCurrency(currentMonthNetCashFlow)}</p>
            <p>{netWorthChangeFormatted}</p>
          </div>
        </Card>

        <Card className="flex justify-between items-center">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Your Monthly Savings Goal</p>
            <p className="font-medium text-lg">
              {formatCurrency(currentMonthNetCashFlow)} / {formatCurrency(currentMonthNetCashFlowTarget)}
            </p>
          </div>
          <MonthlySavingsProgress
            actual={currentMonthNetCashFlow}
            target={currentMonthNetCashFlowTarget}/>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Cash Flow for This Month</p>
          </div>
          <CashFlowDeltaBar monthlyExpenses={monthlyExpenses} monthlyIncome={monthlyIncome}/>
        </Card>

        <Card className="flex flex-col gap-2 col-span-full">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Net Worth Over Time</p>
          </div>
          <NetWorthOverTime monthlyExpenses={monthlyExpenses} monthlyIncome={monthlyIncome}/>
        </Card>
      </div>
    </main>
  );
}
