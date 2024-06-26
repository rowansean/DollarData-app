import { RiAddLine, RiEqualizerLine } from '@remixicon/react';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow
} from "@tremor/react";

import React from "react";
import { CashFlowDialog } from '@/components/cashFlow/CashFlowDialog';
import { CashFlowItem, CashFlowType, MonthlyCashFlow, formatCurrency } from "@/lib/types";

function formatMonth(timestamp: number): string {
	const date = new Date(timestamp);

	return date.toLocaleString("en-US", {
		month: "long"
	});
}

function formatMonthAndYear(timestamp: number): string {
	const date = new Date(timestamp);

	return date.toLocaleString("en-US", {
		month: "long",
		year: "numeric"
	});
}

export function CashFlowTable({ monthlyCashFlow, type, onChangeMonth }: {
	monthlyCashFlow: MonthlyCashFlow
	type: CashFlowType
	onChangeMonth: (month: number, newItems: CashFlowItem[]) => void
}) {
	const [selectedMonth, setSelectedMonth] = React.useState<number>();
	const [selectedMonthItems, setSelectedMonthItems] = React.useState<CashFlowItem[]>([]);

	function addMonth() {
		const nextMonth = new Date(Math.max(...Array.from(monthlyCashFlow.keys())));

		nextMonth.setMonth(nextMonth.getMonth() + 1);

		onChangeMonth(nextMonth.getTime(), []);
	}

	return <>
		<Table>
			<TableHead>
				<TableRow>
					<TableHeaderCell>Month</TableHeaderCell>
					<TableHeaderCell>Total</TableHeaderCell>
					<TableHeaderCell>Items</TableHeaderCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{Array
					.from(monthlyCashFlow.entries())
					.toSorted(([month1, _1], [month2, _]) => month1 - month2)
					.map(([month, items]) =>
						<TableRow key={month}>
							<TableCell>{formatMonthAndYear(month)}</TableCell>
							<TableCell>
								{formatCurrency(
									items
										.map(item => item.amountCents)
										.reduce((previous, current) => previous + current, 0)
								)}
							</TableCell>

							<TableCell className="flex gap-2">
								{Array.from(new Set(items.map(item => item.name))).map(name =>
									<Button key={name} variant="primary">{name}</Button>
								)}

								<Button
									className="px-2"
									icon={RiEqualizerLine}
									variant="secondary"
									onClick={() => {
										setSelectedMonthItems(items);
										setSelectedMonth(month);
									}}/>
							</TableCell>
						</TableRow>
					)}
			</TableBody>
		</Table>

		<div className="flex items-center justify-center py-4 w-full">
				<Button className="px-2" icon={RiAddLine} variant="secondary" onClick={() => {
					addMonth();
				}}/>
			</div>

		<CashFlowDialog
			monthName={selectedMonth == undefined ? "" : formatMonth(selectedMonth)}
			monthItems={selectedMonthItems}
			open={selectedMonth != undefined}
			type={type}
			onClose={newItems => {
				if (newItems != undefined) {
					if (selectedMonth == undefined) {
						throw new Error("A cash flow dialog that wasn't open was closed.");
					}

					onChangeMonth(selectedMonth, newItems);
				}

				setSelectedMonth(undefined);
			}}/>
	</>;
}
