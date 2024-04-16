"use client";

import React from "react";
import { CashFlowType, MonthlyCashFlow } from "@/lib/types";
import { CashFlowPage } from "@/components/CashFlowPage";

export default function ExpensesPage() {
	const [monthlyExpenses, setMonthlyExpenses] = React.useState<MonthlyCashFlow>(() => {
		const result = new Map();

		result.set(Date.now(), [
			{
				name: "Tuition",
				amountCents: 100000
			}
		]);

		return result;
	});

	return <CashFlowPage
		monthlyCashFlow={monthlyExpenses}
		type={CashFlowType.Expenses}
		onChange={newMonthlyExpenses => setMonthlyExpenses(newMonthlyExpenses)}/>;
}
