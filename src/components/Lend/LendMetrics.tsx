import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext } from "../../context/lendContext";

const LendMetrics = () => {
  const { selectedCurrency, supplyAPY, exchangeRates } = useContext(
    LendPageContext
  );

  const { state, updateAppState } = useContext(AppContext);
  const price = exchangeRates[selectedCurrency];
  const balanceSupplied = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.balance} DAI`
    : "-";
  const walletBalance = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.daiBalance} DAI`
    : "-";
  return (
    <Card className="metrics-card" title="Metrics">
      <Metric title="Supply APY" value={`${supplyAPY}%`} />
      <Metric title={`${selectedCurrency} Price`} value={`$ ${price}`} />
      <Metric title="Wallet Balance" value={`${walletBalance}`} />
      <Metric title="Balance Supplied" value={`${balanceSupplied}`} />
    </Card>
  );
};

export default LendMetrics;
