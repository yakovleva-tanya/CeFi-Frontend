import React, { useContext } from "react";

import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext, mapLendingTokensToTellerTokens } from "../../context/app";
import ConnectPlaid from "./../../actions/ConnectPlaid";

import Arrow from "../UI/Arrow";
import Card from "../UI/Card";
import Metric from "../UI/Metric";
import BR from "../UI/BR";

import "./borrow.scss";

const BorrowMetrics = () => {
  const { borrowRequest, stage } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);

  const { tokenData, teller, web3State } = state;
  const address = web3State?.address;
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
    <Card className="metrics-card" title="Summary">
      <Metric title="Asset price" value={assetPrice} />
      <Metric title="Wallet balance" value={walletBalance} />
      <Metric title="Collateral available" value={collateralAvailable} />
        <div>
          <div className="metrics-div">
            <BR />
          </div>
          <Metric
            title="Pro tip"
            value="Connect to your bank account to reduce collateral ratios."
          />
          <div
            className={`${
              address ? "pointer" : "disabled"
            } text-lg font-medium`}
            onClick={() => {
              if (address) {
                ConnectPlaid(updateAppState, address)();
              }
            }}
          >
            <u className="mr-2">Connect accounts</u>
            <Arrow direction="right" />
          </div>
        </div>
    </Card>
  );
};

export default BorrowMetrics;
