import { Card, DeltaBar } from "@tremor/react";

export const CashFlowDeltaBar = () => (
  <div>
    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
    <span>-$2,430</span>
    <span>$4,100</span>
    </p>
    <DeltaBar value={-45} isIncreasePositive={true} className="mt-3" />
    <DeltaBar value={65} isIncreasePositive={true} className="mt-3" />
    
  </div>
);
