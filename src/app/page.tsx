import Header from "@/components/Header";
import { BadgeDelta, Button, Card } from "@tremor/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col gap-5 p-3 md:p-5">
      <div className="border w-full flex flex-col gap-3">
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
        <p className="text-sm font-light">your total assets minus liabilities as of 04/15/2000</p>
      </div>
      <div>
        <Card>
          <div>
            <p>This Months Change</p>
            <p>April</p>
          </div>
          
        </Card>
      </div>
    </main>
  );
}
