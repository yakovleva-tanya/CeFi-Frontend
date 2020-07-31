import React from "react";
import Metric from "../UI/Metric";
import Card from "../UI/Card";

type LendMetricsType = {
  currency: string;
  price: number;
  walletBalance: string;
};

const LendMetrics = ({ currency, price, walletBalance }: LendMetricsType) => {
  return (
    <Card className="flex-1" title="Metrics">
      <Metric title="Supply APY" value="8.40%" />
      <Metric title={`Price - ${currency}`} value={`$ ${price}`} />
      <Metric title="Wallet" value={walletBalance} />
    </Card>
  );
};

export default LendMetrics;
