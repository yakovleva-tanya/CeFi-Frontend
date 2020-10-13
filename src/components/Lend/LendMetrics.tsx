import React, { useContext } from "react";
import {
  AppContext,
  BaseTokens,
  mapLendingTokensToTellerTokens,
} from "../../context/app";
import Metric from "../UI/Metric";
import Card from "../UI/Card";
import { LendPageContext } from "../../context/lendContext";
import copy from "../../copy.json";

const LendMetrics = () => {
  const { selectedCurrency } = useContext(LendPageContext);
  const { state } = useContext(AppContext);
  const { tokenData, teller } = state;

  const price = tokenData
    ? `$${Math.round(tokenData[selectedCurrency].price * 100) / 100}`
    : "-";
  // TODO: this should update based on the selected ATM type.
  const supplyAPY = tokenData
    ? `${Math.round(tokenData[selectedCurrency].supplyAPY * 10000) / 100}%`
    : "-";

  const walletBalance =
    teller?.userWalletBalance &&
    teller?.userWalletBalance[selectedCurrency] !== undefined
      ? `${teller.userWalletBalance[selectedCurrency].toFixed(
          2
        )} ${selectedCurrency}`
      : "-";

  const convertedCurrency = mapLendingTokensToTellerTokens(selectedCurrency);

  const suppliedBalance =
    teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance !==
      null &&
    teller?.contracts[BaseTokens.ETH][convertedCurrency].suppliedBalance !==
      undefined
      ? `${teller?.contracts[BaseTokens.ETH][
          convertedCurrency
        ].suppliedBalance.toFixed(2)} ${selectedCurrency}`
      : "-";
  //TODO: Get real values
  const ATM = "74.43";
  const COMP = "45.43";
  const {
    depositAPYTitle,
    assetPriceTitle,
    walletBalanceTitle,
  } = copy.pages.deposit.metrics;

  return (
    <Card className="metrics-card" title="Summary">
      <Metric title={depositAPYTitle} value={supplyAPY} />
      <Metric title={assetPriceTitle} value={price} />
      <Metric title={walletBalanceTitle} value={walletBalance} />
      {/* <Metric title="Balance supplied" value={suppliedBalance} />
      <Metric title="Earned balance" values={[`${ATM} TLR`, `${COMP} COMP`]} /> */}
    </Card>
  );
};

export default LendMetrics;
