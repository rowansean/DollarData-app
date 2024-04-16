export type CashFlowItem = {
	name: string,
	amountCents: number
};

export enum CashFlowType {
	Income,
	Expenses
}

export type MonthlyCashFlow = Map<number, CashFlowItem[]>;

export const currentMonth = new Date();

currentMonth.setHours(0, 0, 0, 0);
currentMonth.setDate(1);

export function cashFlowTypeItemName(type: CashFlowType): string {
	switch (type) {
		case CashFlowType.Income: return "income item";
		case CashFlowType.Expenses: return "expense";
	}
}

export function cashFlowTypeName(type: CashFlowType): string {
	switch (type) {
		case CashFlowType.Income: return "Income";
		case CashFlowType.Expenses: return "Expenses";
	}
}

export function formatCurrency(amountCents: number): string {
	return `$${(amountCents / 100).toFixed(2)}`;
}
