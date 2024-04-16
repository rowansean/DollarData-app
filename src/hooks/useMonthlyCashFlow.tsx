import { CashFlowItem, MonthlyCashFlow } from "@/lib/types";
import React from "react";

const defaultMonth = new Date();

defaultMonth.setHours(0, 0, 0, 0);
defaultMonth.setDate(1);

function serializeMonthlyCashFlow(monthlyCashFlow: MonthlyCashFlow): unknown {
	return Array.from(monthlyCashFlow.entries());
}

function deserializeMonthlyCashFlow(monthlyCashFlow: unknown): MonthlyCashFlow {
	return new Map(monthlyCashFlow as [number, CashFlowItem[]][]);
}

function useCachedEncodedState<Value, Initial>(
	key: string,
	serialize: (value: Value | Initial) => unknown,
	deserialize: (value: unknown) => Value,
	initial: () => Initial
): [Value | Initial, (newValue: Value) => void] {
	const [value, setValue] = React.useState<Value | Initial>(() => initial());

	React.useEffect(() => {
		const cached = window.localStorage.getItem(key);

		setValue(cached == null ? initial() : deserialize(JSON.parse(cached)));
	}, []);

	return [
		value,
		newValue => {
			window.localStorage.setItem(key, JSON.stringify(serialize(newValue)));

			setValue(newValue);
		}
	];
}

export function useMonthlyExpenses(): [MonthlyCashFlow, (newMontlyIncome: MonthlyCashFlow) => void] {
	return useCachedEncodedState(
		"expenses",
		monthlyCashFlow => serializeMonthlyCashFlow(monthlyCashFlow),
		monthlyCashFlow => deserializeMonthlyCashFlow(monthlyCashFlow),
		() => {
			const result: MonthlyCashFlow = new Map();

			result.set(defaultMonth.getTime(), [
				{
					name: "Tuition",
					amountCents: 100000
				}
			]);

			return result;
		}
	);
}

export function useMonthlyIncome(): [MonthlyCashFlow, (newMontlyIncome: MonthlyCashFlow) => void] {
	return useCachedEncodedState(
		"income",
		monthlyCashFlow => serializeMonthlyCashFlow(monthlyCashFlow),
		monthlyCashFlow => deserializeMonthlyCashFlow(monthlyCashFlow),
		() => {
			const result: MonthlyCashFlow = new Map();

			result.set(defaultMonth.getTime(), [
				{
					name: "Salary",
					amountCents: 400000
				}
			]);

			return result;
		}
	);
}
