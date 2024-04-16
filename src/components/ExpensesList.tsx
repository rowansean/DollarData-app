import { List, ListItem } from "@tremor/react";
import { MonthlyExpenses, formatCurrency } from "@/lib/types";

export function ExpensesList({ monthlyExpenses }: { monthlyExpenses: MonthlyExpenses }) {
	const frequency = new Map<string, number>();

	monthlyExpenses.forEach((expenses) => {
		expenses.forEach(expense => {
			frequency
				.set(expense.name, frequency.get(expense.name) ?? 0 + expense.amountCents);
		});
	});

	const mostFrequent = Array
		.from(frequency.entries())
		.toSorted(([_1, amountCents1], [_2, amountCents2]) => amountCents2 - amountCents1)
		.slice(0, 10);

	return <>
		<h2 className="font-semibold mb-4 text-tremor-content-strong text-xl">Recurring Expenses</h2>
		<List>
			{mostFrequent.map(([name, amountCents]) =>
				<ListItem key={name}>
					<span>{name}</span>
					<span>{formatCurrency(amountCents)}/month</span>
				</ListItem>
			)}
		</List>
	</>;
}
