import React, { useContext } from "react";
import Card from "../UI/Card";
import Metric from "../UI/Metric";
import BR from "../UI/BR";
import "./borrow.scss";
import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext, mapLendingTokensToTellerTokens } from "../../context/app";

const BorrowMetrics = () => {
  const { borrowRequest, stage } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);
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
    <Card className="metrics-card" title="Summary">
      <Metric title={`${lendWith} Price`} value={assetPrice} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Collateral available" value={collateralAvailable} />
      {stage === 1 && (
        <div>
          <div className="metrics-div">
            <BR />
          </div>
          <Metric
            title="Tip"
            value=" Connect your bank account and select Fixed loan type to qualify for 0% collateral."
          />
        </div>
      )}
    </Card>
  );
};

export default BorrowMetrics;
