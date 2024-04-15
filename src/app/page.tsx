import { CashFlowDeltaBar } from "@/components/CashFlowDeltaBar";
import MonthlySavingsProgress from "@/components/MonthlySavingsProgress";
import NetWorthMonthChange from "@/components/NetWorthMonthChange";
import { NetWorthOverTime } from "@/components/NetWorthOverTime";
import { BadgeDelta, Button, Card } from "@tremor/react";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col gap-5 p-5 md:p-10">
      <div className=" w-full flex flex-col gap-3">
        <div className="flex gap-2">
          <h3 className="font-light">View your Net Worth</h3>
          <BadgeDelta
            deltaType="moderateIncrease"
            isIncreasePositive={true}
            size="xs"
          >
            +9.3%
          </BadgeDelta>
        </div>
        <h1 className="text-6xl font-bold">$74,390.13</h1>
        <p className="text-sm font-light">
          your total assets minus liabilities as of 04/15/2000
        </p>
      </div>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex justify-between items-center">
          <div className="h-fit text-left">
            <p className="font-light text-sm">This Months Change</p>
            <p className="font-medium text-lg">April</p>
          </div>
          <NetWorthMonthChange className=" w-28" />
          <div>
            <p>$196.26</p>
            <p>+9.3%</p>
          </div>
        </Card>

        <Card className="flex justify-between items-center">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Your Monthly Savings Goal</p>
            <p className="font-medium text-lg">$45 / $340</p>
          </div>
          <MonthlySavingsProgress className="" />
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Cash Flow for this month</p>
          </div>
          <CashFlowDeltaBar />
        </Card>

        <Card className="flex flex-col gap-2 col-span-full">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Net Worth Over Time</p>
          </div>
          <NetWorthOverTime />
        </Card>
      </div>
    </main>
  );
}
