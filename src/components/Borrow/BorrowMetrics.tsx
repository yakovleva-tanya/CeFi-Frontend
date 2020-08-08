import React from "react";
import Card from "../UI/Card";
import Metric from "../UI/Metric";

const BorrowMetrics = () => {
  return (
    <Card className="metrics-card" title="Metrics">
      <Metric title="Supply APY" value="8.40%" />
      <Metric title="Utilization" value="31%" />
      <Metric title="Wallet" value="84 DAI" />
      <Metric title="Collateral total" value="42 ETH" />
    </Card>
  );
};

export default BorrowMetrics;
