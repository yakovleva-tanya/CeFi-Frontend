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
  const walletBalance = "-"; // TODO:  fetch the user's balanceOf() from web3
  const balanceSupplied = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.balance} ${selectedCurrency}`
    : "-";

  return (
    <Card className="metrics-card" title="Metrics">
      <Metric title="Supply APY" value={`${supplyAPY}%`} />
      <Metric title={`Price - ${selectedCurrency}`} value={`$ ${price}`} />
      <Metric title="Wallet" value={`${walletBalance}`} />
      <Metric title="Balance Supplied" value={`${balanceSupplied}`} />
    </Card>
  );
};

export default LendMetrics;
