"use client";

import React from "react";
import { CashFlowPage } from "@/components/cashFlow/CashFlowPage";
import { CashFlowType, MonthlyCashFlow } from "@/lib/types";

export default function ExpensesPage() {
	const [monthlyIncome, setMonthlyIncome] = React.useState<MonthlyCashFlow>(() => {
		const result = new Map();

		result.set(Date.now(), [
			{
				name: "Salary",
				amountCents: 400000
			}
		]);

		return result;
	});

	return <CashFlowPage
		monthlyCashFlow={monthlyIncome}
		type={CashFlowType.Income}
		onChange={newMonthlyIncome => setMonthlyIncome(newMonthlyIncome)}/>;
}
