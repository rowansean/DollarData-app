import { List, ListItem } from "@tremor/react";
import { CashFlowType, MonthlyCashFlow, cashFlowTypeName, formatCurrency } from "@/lib/types";

export function CashFlowList({ monthlyCashFlow, type }: {
	monthlyCashFlow: MonthlyCashFlow
	type: CashFlowType
}) {
	const frequency = new Map<string, number>();

	monthlyCashFlow.forEach(items => {
		items.forEach(item => {
			frequency.set(item.name, frequency.get(item.name) ?? 0 + item.amountCents);
		});
	});

	const mostFrequent = Array
		.from(frequency.entries())
		.toSorted(([_1, amountCents1], [_2, amountCents2]) => amountCents2 - amountCents1)
		.slice(0, 10);

	return <>
		<h2 className="font-semibold mb-4 text-tremor-content-strong text-xl">
			Recurring {cashFlowTypeName(type)}
		</h2>

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
