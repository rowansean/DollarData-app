"use client";

import { CashFlowDeltaBar } from "@/components/CashFlowDeltaBar";
import InfoHoverCard from "@/components/InfoHoverCard";
import MonthlySavingsProgress from "@/components/MonthlySavingsProgress";
import NetWorthMonthChange from "@/components/NetWorthMonthChange";
import { NetWorthOverTime } from "@/components/NetWorthOverTime";
import { BadgeDelta, Button, Card } from "@tremor/react";
import { Info, InfoIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [netWorth, setNetWorth] = useState(() =>
    JSON.parse(localStorage.getItem("netWorth") || "0")
  );
  const [monthlyChange, setMonthlyChange] = useState(() =>
    JSON.parse(localStorage.getItem("monthlyChange") || "0")
  );
  const [savingsGoal, setSavingsGoal] = useState(() =>
    JSON.parse(localStorage.getItem("savingsGoal") || "0")
  );
  const [income, setIncome] = useState(
    () => JSON.parse(localStorage.getItem("cashFlow"))?.income || "0"
  );
  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("cashFlow"))?.expenses || "0"
  );
  const [netWorthHistory, setNetWorthHistory] = useState(
    () => JSON.parse(localStorage.getItem("netWorthHistory"))?.join(", ") || ""
  );

  const saveDataToLocalStorage = () => {
    localStorage.setItem("netWorth", JSON.stringify(netWorth));
    localStorage.setItem("monthlyChange", JSON.stringify(monthlyChange));
    localStorage.setItem("savingsGoal", JSON.stringify(savingsGoal));
    localStorage.setItem("cashFlow", JSON.stringify({ income, expenses }));
    localStorage.setItem(
      "netWorthHistory",
      JSON.stringify(netWorthHistory.split(", ").map(Number))
    );
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <main className="w-screen min-h-screen flex flex-col gap-5 p-5 md:p-10">
      {/* POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-5 rounded-md shadow-md">
            <h1 className="text-2xl font-bold">Update your info below</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveDataToLocalStorage();
              }}
            >
              <div className="flex flex-col gap-3">
                <label className="font-light text-sm" htmlFor="netWorth">
                  Net Worth
                </label>
                <input
                  type="number"
                  value={netWorth}
                  onChange={(e) => setNetWorth(e.target.value)}
                  placeholder="Net Worth"
                />
                <label className="font-light text-sm" htmlFor="monthlyChange">
                  Monthly Change
                </label>
                <input
                  type="number"
                  value={monthlyChange}
                  onChange={(e) => setMonthlyChange(e.target.value)}
                  placeholder="Monthly Change"
                />
                <label className="font-light text-sm" htmlFor="savingsGoal">
                  Savings Goal
                </label>
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  placeholder="Savings Goal"
                />
                <label className="font-light text-sm" htmlFor="cashFlow">
                  Income
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Income"
                />
                <label className="font-light text-sm" htmlFor="cashFlow">
                  Expenses
                </label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="Expenses"
                />
                <label className="font-light text-sm" htmlFor="netWorthHistory">
                  Net Worth History
                </label>
                <input
                  type="text"
                  value={netWorthHistory}
                  onChange={(e) => setNetWorthHistory(e.target.value)}
                  placeholder="Net Worth History (comma-separated)"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-3 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* END POPUP MODAL */}

      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded max-w-56"
      >
        Update Your Profile
      </button>

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
        <h1 className="text-6xl font-bold">${netWorth}</h1>
        <p className="text-sm font-light">
          your total assets minus liabilities
        </p>
      </div>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex justify-between items-center">
          <div className="card-header place-self-start mr-3">
            <InfoHoverCard>
              This months change is calculated by comparing your net worth at
              the beginning of the month to your net worth at the end of the
              month.
            </InfoHoverCard>
          </div>
          <div className="h-fit text-left">
            <p className="font-light text-sm">This Months Change</p>
            <p className="font-medium text-lg">April</p>
          </div>
          <NetWorthMonthChange className=" w-28" />
          <div>
            <p>{monthlyChange}</p>
          </div>
        </Card>

        <Card className="flex justify-between items-center">
          <div className="card-header place-self-start mr-3">
            <InfoHoverCard>
              Your monthly savings goal is the amount you want to save each
              month to reach your financial goals.
            </InfoHoverCard>
          </div>
          <div className="h-fit text-left">
            <p className="font-light text-sm">Your Monthly Savings Goal</p>
            <p className="font-medium text-lg">
              ${Math.floor(income - expenses)} / ${savingsGoal}
            </p>
          </div>
          <MonthlySavingsProgress
            value={(((income - expenses) / savingsGoal) * 100).toFixed(0)}
            className=""
          />
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="card-header place-self-start mr-3">
            <InfoHoverCard>
              Your cash flow is the amount of money coming in and going out of
              your accounts each month.
            </InfoHoverCard>
          </div>
          <div className="h-fit text-left">
            <p className="font-light text-sm">Cash Flow for this month</p>
          </div>
          <CashFlowDeltaBar income={income} expenses={expenses} />
        </Card>

        <Card className="flex flex-col gap-2 col-span-full">
          <div className="h-fit text-left">
            <p className="font-light text-sm">Net Worth Over Time</p>
          </div>
          <NetWorthOverTime
            netWorths={netWorthHistory.split(", ").map(Number)}
          />
        </Card>
      </div>
    </main>
  );
}
