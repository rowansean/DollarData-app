import { DonutChart, Legend } from "@tremor/react";
import { MonthlyExpenses, formatCurrency } from "@/lib/types";

export function ExpensesDonutChart({ monthlyExpenses }: { monthlyExpenses: MonthlyExpenses }) {
	const categories = Array.from(
		new Set(Array.from(monthlyExpenses.values()).flat().map(expense => expense.name))
	);

	const data = Array.from(monthlyExpenses.values()).flat();

	return <>
		<DonutChart
			category="amountCents"
			data={data}
			index="name"
			valueFormatter={amountCents => formatCurrency(amountCents)}/>

		<Legend categories={categories}/>
	</>;
}
