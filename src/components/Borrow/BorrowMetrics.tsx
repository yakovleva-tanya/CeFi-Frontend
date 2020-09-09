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
  const { state, updateAppState } = useContext(AppContext);

  const { tokenData, teller, web3State, demoData } = state;
  const address = web3State?.address;
  const { lendWith, collateralWith } = borrowRequest;

  const assetPrice = tokenData
    ? `$ ${Math.round(tokenData[lendWith].price * 100) / 100}`
    : "-";
  const walletBalance = address
    ? `${demoData.walletBalances[lendWith].toFixed(2)} ${lendWith}`
    : "-";

  //const tellerToken = mapLendingTokensToTellerTokens(lendWith);

  const collateralAvailable = address
    ? `${demoData.walletBalances[collateralWith].toFixed(2)} ${collateralWith}`
    : "-";

  return (
    <div className="d-flex flex-column">
      <Card className="metrics-card" title="Summary">
        <Metric title="Asset price" value={assetPrice} />
        <Metric title="Wallet balance" value={walletBalance} />
        <Metric title="Collateral available" value={collateralAvailable} />
      </Card>
      <Card className="metrics-card my-1" title="Pro tip">
        <ProTip />
      </Card>
    </div>
  );
};

export default BorrowMetrics;
