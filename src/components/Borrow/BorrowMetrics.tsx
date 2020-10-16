import React, { useContext } from "react";

import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext, mapLendingTokensToTellerTokens } from "../../context/app";
import ConnectPlaid from "./../../actions/ConnectPlaid";

import Card from "../UI/Card";
import Metric from "../UI/Metric";
import ProTip from "./ProTip";

import "./borrow.scss";

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

  return (
    <div className="d-flex flex-column flex-wrap ">
      <Card className="metrics-card mx-2 w-80 " title="Summary">
        <Metric title="Asset price" value={assetPrice} />
        <Metric title="Wallet balance" value={walletBalance} />
        <Metric title="Collateral available" value={collateralAvailable} />
      </Card>
      <Card className="metrics-card mx-2 my-1 w-80" title="Pro tip">
        <ProTip />
      </Card>
    </div>
  );
};

export default BorrowMetrics;
