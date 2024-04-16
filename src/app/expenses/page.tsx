"use client";

import React from "react";
import { CashFlowPage } from "@/components/cashFlow/CashFlowPage";
import { CashFlowType } from "@/lib/types";
import { useMonthlyExpenses } from "@/hooks/useMonthlyCashFlow";

export default function ExpensesPage() {
	const [monthlyExpenses, setMonthlyExpenses] = useMonthlyExpenses();

	return <CashFlowPage
		monthlyCashFlow={monthlyExpenses}
		type={CashFlowType.Expenses}
		onChange={newMonthlyExpenses => setMonthlyExpenses(newMonthlyExpenses)}/>;
}
