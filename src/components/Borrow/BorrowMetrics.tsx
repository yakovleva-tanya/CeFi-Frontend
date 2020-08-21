import React, { useContext } from "react";
import Card from "../UI/Card";
import Metric from "../UI/Metric";
import BR from "../UI/BR";

import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext, mapLendingTokensToTellerTokens } from "../../context/app";

const BorrowMetrics = () => {
  const { borrowRequest, stage } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);
  const {tokenData, teller} = state;
  const { lendWith, collateralWith } = borrowRequest;

  const assetPrice = tokenData
    ? `$ ${Math.round(tokenData[lendWith].price * 10000) / 10000}`
    : "-";
  const walletBalance = teller?.userWalletBalance&&(
    teller?.userWalletBalance[lendWith] !== null
  )
    ? `${teller.userWalletBalance[lendWith]} ${lendWith}`
    : "-";

  const tellerToken = mapLendingTokensToTellerTokens(lendWith);
  const collateralTotal =
    teller?.contracts[collateralWith][tellerToken].userCollateralBalance !== null
      ? `${teller?.contracts[collateralWith][tellerToken].userCollateralBalance} ${collateralWith}`
      : "-";
  const utilization = '31%';

  return (
    <Card className="metrics-card" title="Summary">
      <Metric title={`Price - ${lendWith}`} value={assetPrice} />
      <Metric title="Utilization" value={utilization} />
      <Metric title="Wallet Balance" value={walletBalance} />
      <Metric title="Collateral total" value={collateralTotal} />
      {/* TODO: check if plaid is connected */}
      {stage === 1 && (
        <div>
          <div className="mt-5 mb-3">
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
