import { RiAddLine, RiDeleteBinLine, RiMoneyDollarCircleLine } from "@remixicon/react";
import { Button, Dialog, DialogPanel, NumberInput, TextInput } from "@tremor/react";
import React from "react";
import { Expense } from "@/lib/types";

export function ExpensesDialog({ monthName, monthExpenses, open, onClose }: {
	monthName: string
	monthExpenses: Expense[]
	open: boolean
	onClose: (newExpenses: Expense[] | undefined) => void
}) {
	const [newExpenses, setNewExpenses] = React.useState(monthExpenses);

	React.useEffect(() => {
		setNewExpenses(monthExpenses);
	}, [monthExpenses]);

	function close() {
		onClose(newExpenses == monthExpenses ? undefined : newExpenses);
	}

	function addExpense() {
		setNewExpenses([
			...newExpenses,

			{
				name: "New Expense",
				amountCents: 0
			}
		]);
	}

	function modifyExpense(i: number, newExpense: Expense) {
		const newNewExpenses = [...newExpenses];

		newNewExpenses[i] = newExpense;

		setNewExpenses(newNewExpenses);
	}

	function removeExpense(i: number) {
		const newNewExpenses = [...newExpenses];

		newNewExpenses.splice(i, 1);

		setNewExpenses(newNewExpenses);
	}

	return <Dialog open={open} onClose={() => {
		close();
	}}>
		<DialogPanel>
			<h3 className="font-semibold text-xl text-tremor-content-strong">
				{monthName}&apos;s Expenses
			</h3>

			<p className="leading-6 mb-2 text-tremor-content text-tremor-default">
				Enter your expenses and their amounts.
			</p>

			{newExpenses.map((expense, i) =>
				<div className="flex gap-2 mb-2" key={i}>
					<TextInput defaultValue={expense.name} placeholder="Name" onChange={event => {
						modifyExpense(i, {
							name: event.currentTarget.value,
							amountCents: expense.amountCents
						});
					}}/>

					<NumberInput
						defaultValue={expense.amountCents / 100}
						icon={RiMoneyDollarCircleLine}
						min={0}
						placeholder="Amount"
						step={0.01}
						onChange={event => {
							modifyExpense(i, {
								name: expense.name,
								amountCents: Math.floor(event.currentTarget.valueAsNumber * 100)
							});
						}}/>

					<Button
						className="px-2"
						icon={RiDeleteBinLine}
						variant="secondary"
						onClick={() => {
							removeExpense(i);
						}}/>
				</div>
			)}

			<div className="flex items-center justify-center py-4 w-full">
				<Button className="px-2" icon={RiAddLine} variant="secondary" onClick={() => {
					addExpense();
				}}/>
			</div>

			<Button className="mt-4 w-full" onClick={() => {
				close();
			}}>
				Done
			</Button>
		</DialogPanel>
	</Dialog>;
}
