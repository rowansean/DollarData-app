"use client";

import { Card } from "@tremor/react";
import React from "react";
import { ExpensesDonutChart } from "@/components/ExpensesDonutChart";
import { ExpensesList } from "@/components/ExpensesList";
import { ExpensesTable } from "@/components/ExpensesTable";
import { Expense, MonthlyExpenses } from "@/lib/types";

export default function ExpensesPage() {
	const [monthlyExpenses, setMonthlyExpenses] = React.useState<MonthlyExpenses>(() => {
		const result = new Map();

		result.set(Date.now(), [
			{
				name: "Tuition",
				amountCents: 100000
			}
		]);

		return result;
	});

	function handleChangeMonth(month: number, newExpenses: Expense[]) {
		const newMonthlyExpenses = new Map(monthlyExpenses);

		newMonthlyExpenses.set(month, newExpenses);

		setMonthlyExpenses(newMonthlyExpenses);
	}

	return <div className="flex gap-4 grow p-4">
		<Card className="grow">
			<ExpensesTable
				monthlyExpenses={monthlyExpenses}
				onChangeMonth={(month, newExpenses) => handleChangeMonth(month, newExpenses)}/>
		</Card>

		<div className="flex flex-col gap-4 w-96">
			<Card className="flex flex-col gap-4 items-center py-12">
				<ExpensesDonutChart monthlyExpenses={monthlyExpenses}/>
			</Card>

			<Card className="grow">
				<ExpensesList monthlyExpenses={monthlyExpenses}/>
			</Card>
		</div>
	</div>;
}
