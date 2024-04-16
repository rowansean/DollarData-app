export type Expense = {
	name: string,
	amountCents: number
};

export type MonthlyExpenses = Map<number, Expense[]>;

export function formatCurrency(amountCents: number): string {
	return `$${(amountCents / 100).toFixed(2)}`;
}
