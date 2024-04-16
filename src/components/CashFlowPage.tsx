import { Card } from "@tremor/react";
import React from "react";
import { CashFlowDonutChart } from "@/components/CashFlowDonutChart";
import { CashFlowList } from "@/components/CashFlowList";
import { CashFlowTable } from "@/components/CashFlowTable";
import { CashFlowItem, CashFlowType, MonthlyCashFlow } from "@/lib/types";

export function CashFlowPage({ monthlyCashFlow, type, onChange }: {
	monthlyCashFlow: MonthlyCashFlow
	type: CashFlowType
	onChange: (newMonthlyCashFlow: MonthlyCashFlow) => void
}) {
	function handleChangeMonth(month: number, newItems: CashFlowItem[]) {
		const newMonthlyCashFlow = new Map(monthlyCashFlow);

		newMonthlyCashFlow.set(month, newItems);

		onChange(newMonthlyCashFlow);
	}

	return <div className="flex gap-4 grow p-4">
		<Card className="grow">
			<CashFlowTable
				monthlyCashFlow={monthlyCashFlow}
				type={type}
				onChangeMonth={(month, newItems) => handleChangeMonth(month, newItems)}/>
		</Card>

		<div className="flex flex-col gap-4 w-96">
			<Card className="flex flex-col gap-4 items-center py-12">
				<CashFlowDonutChart monthlyCashFlow={monthlyCashFlow}/>
			</Card>

			<Card className="grow">
				<CashFlowList monthlyCashFlow={monthlyCashFlow} type={type}/>
			</Card>
		</div>
	</div>;
}
