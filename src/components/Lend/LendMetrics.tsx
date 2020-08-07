import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext } from "../../context/LendContext";

const LendMetrics = () => {
  const {
    selectedCurrency,
    supplyAPY,
    exchangeRates,
  } = useContext(LendPageContext);

  const { state, updateAppState } = useContext(AppContext);
  const price = exchangeRates[selectedCurrency];
  const walletBalance = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.balance} ${selectedCurrency}`
    : "-";

  return (
    <Card className="metrics-card" title="Metrics">
      <Metric title="Supply APY" value={`${supplyAPY}%`} />
      <Metric title={`Price - ${selectedCurrency}`} value={`$ ${price}`} />
      <Metric title="Wallet" value={`${walletBalance}`} />
    </Card>
  );
};

export default LendMetrics;
