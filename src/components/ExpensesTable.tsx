"use client";

import { RiEqualizerLine } from '@remixicon/react';
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
import { Expense, MonthlyExpenses, formatCurrency } from "@/lib/types";
import { ExpensesDialog } from './ExpensesDialog';

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

export function ExpensesTable({ monthlyExpenses, onChangeMonth }: {
	monthlyExpenses: MonthlyExpenses
	onChangeMonth: (month: number, expenses: Expense[]) => void
}) {
	const [selectedMonth, setSelectedMonth] = React.useState<number>();
	const [selectedMonthExpenses, setSelectedMonthExpenses] = React.useState<Expense[]>([]);

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
					.from(monthlyExpenses.entries())
					.toSorted(([month1, _1], [month2, _]) => month1 - month2)
					.map(([month, expenses]) =>
						<TableRow key={month}>
							<TableCell>{formatMonthAndYear(month)}</TableCell>
							<TableCell>
								{formatCurrency(
									expenses
										.map(expense => expense.amountCents)
										.reduce((previous, current) => previous + current, 0)
								)}
							</TableCell>

							<TableCell className="flex gap-2">
								{Array.from(new Set(expenses.map(expense => expense.name))).map(
									name => <Button key={name} variant="primary">{name}</Button>
								)}

								<Button
									className="px-2"
									icon={RiEqualizerLine}
									variant="secondary"
									onClick={() => {
										setSelectedMonthExpenses(expenses);
										setSelectedMonth(month);
									}}/>
							</TableCell>
						</TableRow>
					)}
			</TableBody>
		</Table>

		<ExpensesDialog
			monthName={selectedMonth == undefined ? "" : formatMonth(selectedMonth)}
			monthExpenses={selectedMonthExpenses}
			open={selectedMonth != undefined}
			onClose={newExpenses => {
				if (newExpenses != undefined) {
					if (selectedMonth == undefined) {
						throw new Error("The expenses dialog was closed when it wasn't open.");
					}

					onChangeMonth(selectedMonth, newExpenses);
				}

				setSelectedMonth(undefined);
			}}/>
	</>;
}
