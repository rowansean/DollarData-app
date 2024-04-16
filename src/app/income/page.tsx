"use client";

import React from "react";
import { CashFlowPage } from "@/components/cashFlow/CashFlowPage";
import { CashFlowType } from "@/lib/types";
import { useMonthlyIncome } from "@/hooks/useMonthlyCashFlow";

export default function ExpensesPage() {
	const [monthlyIncome, setMonthlyIncome] = useMonthlyIncome();

	return <CashFlowPage
		monthlyCashFlow={monthlyIncome}
		type={CashFlowType.Income}
		onChange={newMonthlyIncome => setMonthlyIncome(newMonthlyIncome)}/>;
}
