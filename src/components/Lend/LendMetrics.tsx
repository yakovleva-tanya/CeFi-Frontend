import React, { useContext } from "react";
import {
  AppContext,
  TellerTokens,
  BaseTokens
} from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext, AvailableTokens } from "../../context/lendContext";

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

  const mapToTeller = (x: AvailableTokens): TellerTokens => {
    if (x === AvailableTokens.DAI) return TellerTokens.tDAI;
    if (x === AvailableTokens.USDC) return TellerTokens.tUSDC;
  };

  const convertedCurrency = mapToTeller(selectedCurrency);

  const suppliedBalance =
    teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance !== null
      ? `${teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance} ${selectedCurrency}`
      : "-";

  return (
    <Card className="metrics-card" title="Summary">
      <Metric title="Supply APY" value={supplyAPY} />
      <Metric title={`Price - ${selectedCurrency}`} value={price} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Balance Supplied" value={suppliedBalance} />
    </Card>
  );
};

export default LendMetrics;
