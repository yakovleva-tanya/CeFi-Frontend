import React, { useContext } from "react";
import {
  AppContext,
  BaseTokens,
  mapLendingTokensToTellerTokens,
} from "../../context/app";
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

  const walletBalance =
    teller?.userWalletBalance &&
    teller?.userWalletBalance[selectedCurrency] !== undefined
      ? `${teller.userWalletBalance[selectedCurrency]} ${selectedCurrency}`
      : "-";

  const convertedCurrency = mapLendingTokensToTellerTokens(selectedCurrency);

  const suppliedBalance =
    teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance !==
      null &&
    teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance !==
      undefined
      ? `${
          teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance
        } ${selectedCurrency}`
      : "-";
  //TODO: Get real values
  const ATM = "74.4223";
  const COMP = "45.4311";
  return (
    <Card className="metrics-card" title="Summary">
      <Metric title="Supply APY" value={supplyAPY} />
      <Metric title={`${selectedCurrency} Price`} value={price} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Balance Supplied" value={suppliedBalance} />
      <Metric title="Earned Balance" values={[`${ATM} ATM`, `${COMP} COMP`]} />
    </Card>
  );
};

export default LendMetrics;
