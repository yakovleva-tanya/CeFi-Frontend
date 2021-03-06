import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext } from "../../context/lendContext";

const LendMetrics = () => {
  const { selectedCurrency } = useContext(LendPageContext);
  const { state } = useContext(AppContext);
  const tokenData = state.tokenData;
  const price = tokenData
    ? `$ ${Math.round(tokenData[selectedCurrency].price * 10000) / 10000}`
    : "-";
  const supplyAPY = tokenData
    ? `${Math.round(tokenData[selectedCurrency].supplyAPY * 10000) / 100}%`
    : "-";
  const balanceSupplied = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.balance} DAI`
    : "-";
  const walletBalance = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.daiBalance} DAI`
    : "-";
  return (
    <Card className="metrics-card" title="Summary">
      <Metric title="Supply APY" value={supplyAPY} />
      <Metric title={`Price - ${selectedCurrency}`} value={price} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Balance Supplied" value={`${balanceSupplied}`} />
    </Card>
  );
};

export default LendMetrics;
