import React, { useContext } from "react";
import Card from "../UI/Card";
import Metric from "../UI/Metric";
import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext } from "../../context/app";

const BorrowMetrics = () => {
  const { borrowRequest } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);

  const walletBalance = state.zeroCollateral?.balance
    ? `${state.zeroCollateral?.balance} ${borrowRequest.lendWith}`
    : "-";

  return (
    <Card className="metrics-card" title="Metrics">
      <Metric title="Supply APY" value="8.40%" />
      <Metric title="Utilization" value="31%" />
      <Metric title="Wallet" value={walletBalance} />
      <Metric
        title="Collateral total"
        value={`42 ${borrowRequest.collateralWith}`}
      />
    </Card>
  );
};

export default BorrowMetrics;
