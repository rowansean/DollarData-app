import { Card, DeltaBar } from "@tremor/react";

export const CashFlowDeltaBar = ({
  income,
  expenses,
}: {
  income?: number;
  expenses?: number;
}) => (
  <div>
    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
      <span>${expenses ?? 0}</span>
      <span>${income ?? 0}</span>
    </p>
    <DeltaBar
      value={-expenses*0.02}
      isIncreasePositive={true}
      className="mt-3"
    />
    <DeltaBar
      value={income*0.02}
      isIncreasePositive={true}
      className="mt-3"
    />
  </div>
);
