import { DonutChart, Legend } from "@tremor/react";
import { MonthlyCashFlow, formatCurrency } from "@/lib/types";

export function CashFlowDonutChart({ monthlyCashFlow }: { monthlyCashFlow: MonthlyCashFlow }) {
	const categories = Array.from(
		new Set(Array.from(monthlyCashFlow.values()).flat().map(item => item.name))
	);

	const data = Array.from(monthlyCashFlow.values()).flat();

	return <>
		<DonutChart
			category="amountCents"
			data={data}
			index="name"
			valueFormatter={amountCents => formatCurrency(amountCents)}/>

		<Legend categories={categories}/>
	</>;
}
