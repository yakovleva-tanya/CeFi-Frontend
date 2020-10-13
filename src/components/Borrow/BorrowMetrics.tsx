import React, { useContext } from "react";

import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext } from "../../context/app";

import Card from "../UI/Card";
import Metric from "../UI/Metric";
import ProTip from "./ProTip";

import "./borrow.scss";
import copy from "../../copy.json";

const BorrowMetrics = () => {
  const { borrowRequest } = useContext(BorrowPageContext);
  const { state } = useContext(AppContext);

  const { tokenData, teller } = state;
  const { lendWith, collateralWith } = borrowRequest;

  const assetPrice = tokenData
    ? `$ ${Math.round(tokenData[lendWith].price * 100) / 100}`
    : "-";
  const walletBalance =
    teller?.userWalletBalance &&
    teller?.userWalletBalance[lendWith] !== undefined
      ? `${teller.userWalletBalance[lendWith].toFixed(2)} ${lendWith}`
      : "-";
  //const tellerToken = mapLendingTokensToTellerTokens(lendWith);

  const collateralAvailable =
    teller?.userWalletBalance &&
    teller?.userWalletBalance[collateralWith] !== undefined
      ? `${teller.userWalletBalance[collateralWith].toFixed(
          2
        )} ${collateralWith}`
      : "-";

  const {
    assetPriceTitle,
    walletBalanceTitle,
    collateralAvailableTitle,
    header,
  } = copy.pages.borrow.metrics;

  return (
    <div className="d-flex flex-column">
      <Card className="metrics-card" title={header}>
        <Metric title={assetPriceTitle} value={assetPrice} />
        <Metric title={walletBalanceTitle} value={walletBalance} />
        <Metric title={collateralAvailableTitle} value={collateralAvailable} />
      </Card>
      <Card className="metrics-card my-1" title="Pro tip">
        <ProTip />
      </Card>
    </div>
  );
};

export default BorrowMetrics;
