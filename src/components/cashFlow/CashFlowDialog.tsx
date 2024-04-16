import { RiAddLine, RiDeleteBinLine, RiMoneyDollarCircleLine } from "@remixicon/react";
import { Button, Dialog, DialogPanel, NumberInput, TextInput } from "@tremor/react";
import React from "react";
import { CashFlowItem, CashFlowType, cashFlowTypeItemName, cashFlowTypeName } from "@/lib/types";

export function CashFlowDialog({ monthName, monthItems, open, type, onClose }: {
	monthName: string
	monthItems: CashFlowItem[]
	open: boolean
	type: CashFlowType
	onClose: (newItems: CashFlowItem[] | undefined) => void
}) {
	const [newItems, setNewItems] = React.useState(monthItems);

	React.useEffect(() => {
		setNewItems(monthItems);
	}, [monthItems]);

	function close() {
		onClose(newItems == monthItems ? undefined : newItems);
	}

	function addItem() {
		setNewItems([
			...newItems,

			{
				name: `New ${cashFlowTypeItemName(type)}`,
				amountCents: 0
			}
		]);
	}

	function modifyItem(i: number, newItem: CashFlowItem) {
		const newNewItems = [...newItems];

		newNewItems[i] = newItem;

		setNewItems(newNewItems);
	}

	function removeItem(i: number) {
		const newNewItems = [...newItems];

		newNewItems.splice(i, 1);

		setNewItems(newNewItems);
	}

	return <Dialog open={open} onClose={() => {
		close();
	}}>
		<DialogPanel>
			<h3 className="font-semibold text-tremor-content-strong text-xl">
				{monthName}&apos;s {cashFlowTypeName(type)}
			</h3>

			<p className="leading-6 mb-2 text-tremor-content text-tremor-default">
				Enter your {cashFlowTypeItemName(type)}s and their amounts.
			</p>

			{newItems.map((item, i) =>
				<div className="flex gap-2 mb-2" key={i}>
					<TextInput defaultValue={item.name} placeholder="Name" onChange={event => {
						modifyItem(i, {
							name: event.currentTarget.value,
							amountCents: item.amountCents
						});
					}}/>

					<NumberInput
						defaultValue={item.amountCents / 100}
						icon={RiMoneyDollarCircleLine}
						min={0}
						placeholder="Amount"
						step={0.01}
						onChange={event => {
							modifyItem(i, {
								name: item.name,
								amountCents: Math.floor(event.currentTarget.valueAsNumber * 100)
							});
						}}/>

					<Button
						className="px-2"
						icon={RiDeleteBinLine}
						variant="secondary"
						onClick={() => {
							removeItem(i);
						}}/>
				</div>
			)}

			<div className="flex items-center justify-center py-4 w-full">
				<Button className="px-2" icon={RiAddLine} variant="secondary" onClick={() => {
					addItem();
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
