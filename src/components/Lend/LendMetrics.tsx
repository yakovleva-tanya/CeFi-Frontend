import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext } from "../../context/lendContext";

const LendMetrics = () => {
  const { selectedCurrency } = useContext(LendPageContext);
  const { state } = useContext(AppContext);
  const { tokenData, teller } = state;

  const price = tokenData
    ? `$ ${Math.round(tokenData[selectedCurrency].price * 10000) / 10000}`
    : "-";
  // TODO: this should update based on the selected ATM type.
  const supplyAPY = tokenData
    ? `${Math.round(tokenData[selectedCurrency].supplyAPY * 10000) / 100}%`
    : "-";

  const walletBalance = teller?.userWalletBalance&&(
    teller?.userWalletBalance[selectedCurrency] !== null
  )
    ? `${teller.userWalletBalance[selectedCurrency]} ${selectedCurrency}`
    : "-";

  const suppliedBalance =
    teller?.contracts.ETH[selectedCurrency].suppliedBalance !== null
      ? `${teller?.contracts.ETH[selectedCurrency].suppliedBalance} ${selectedCurrency}`
      : "-";

  return (
    <Card className="metrics-card" title="Summary">
      <Metric title="Supply APY" value={supplyAPY} />
      <Metric title={`${selectedCurrency} Price`} value={price} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Balance Supplied" value={suppliedBalance} />
    </Card>
  );
};

export default LendMetrics;
