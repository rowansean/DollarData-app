import { TabGroup, TabList, Tab } from "@tremor/react";
import { CircleDollarSign, LayoutDashboard, ParkingMeter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header({ className }: { className: string }) {
  return (
    <div className={`${className} flex shadow-md`}>
      <TabGroup className="s self-end">
        <TabList className="border-none" variant="line" defaultValue="1">
          <Link href="/">
            <Tab value="1">Dashboard</Tab>
          </Link>
          <Link href="/income">
            <Tab value="2">Income</Tab>
          </Link>
          <Link href="/expenses">
            <Tab value="3">Expenses</Tab>
          </Link>
        </TabList>
      </TabGroup>
    </div>
  );
}
