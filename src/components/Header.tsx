import { TabGroup, TabList, Tab } from "@tremor/react";
import { CircleDollarSign, LayoutDashboard, ParkingMeter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header({ className }: { className: string }) {
  return (
    <div className={`${className} flex shadow-md`}>
      <TabGroup className="s self-end">
        <TabList className="border-none" variant="line" defaultValue="1">
          <Tab value="1">
            <Link href="/">
              Dashboard
            </Link>
          </Tab>
          <Tab value="2">
            <Link href="/income">
              Income
            </Link>
          </Tab>
          <Tab value="3">
            <Link href="/expenses">Expenses</Link>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  );
}
