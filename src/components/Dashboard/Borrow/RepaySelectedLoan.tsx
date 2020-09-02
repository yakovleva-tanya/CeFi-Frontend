import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import { repayLoan } from "../../../actions/DashboardBorrowActions";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { BorrowRepayContext } from "../../../context/dashboardContext";
import { AppContext } from "../../../context/app";
import ViewContractLink from "../ViewContractLink";

const RepaySelectedLoan = () => {
  //TODO fetch real rates
  const collateralRates: any = {
    ETH: 441.25,
    LINK: 14.92,
  };
  const currentTime = Date.now();

  const {
    setRepaying,
    selectedLoan,
    setSelectedLoan,
    setRepaySuccess,
  } = useContext(BorrowRepayContext);

  const {
    terms,
    amountBorrowed,
    token,
    totalCollateralDepositsAmount,
    totalCollateralWithdrawalsAmount,
    collateralToken,
    totalOwedAmount,
    id,
    transactionHash,
    status,
  } = selectedLoan;

  const { state } = useContext(AppContext);
  const collateralAmount =
    totalCollateralDepositsAmount - totalCollateralWithdrawalsAmount;
  const currentCollateralPercent = (
    (collateralAmount /
      state.tokenData[token].price /
      (totalOwedAmount / collateralRates[collateralToken])) *
    100
  ).toFixed(2);

  const onRepayLoan = async (id: string) => {
    setRepaying(true);
    setSelectedLoan(null);
    const res = await repayLoan(id);
    setRepaying(false);
    setRepaySuccess(res);
  };
  const timeTillExpires = Math.round(
    (currentTime - terms.expiryAt) / (60 * 60 * 24 * 1000)
  );
  let statusName = "";
  if (status === "Closed") {
    statusName = "Repaid";
  } else if (timeTillExpires > 0) {
    statusName = "Outstanding";
  } else {
    statusName = "Overdue";
  }
  return (
    <div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="Interest Rate">
          <div className="font-medium">{terms.interestRate}%</div>
        </TableRow>
        <BR />
        <TableRow title="Loan size">
          <div className="font-medium">
            {amountBorrowed} {token}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan term">
          <div className="font-medium">{terms.duration} Days</div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium">-</div>
        </TableRow>
        <BR />
        <TableRow title="Liquidation %">
          <div className="font-medium">{terms.collateralRatio} %</div>
        </TableRow>
        <BR />
        <TableRow title="Current Collateral %">
          <div className="font-medium">{currentCollateralPercent} %</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral amount">
          <div className="font-medium">
            {collateralAmount} {collateralToken}
          </div>
        </TableRow>
      </div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="Status">
          <div className="font-medium">{statusName}</div>
        </TableRow>
        <BR />
        {status !== "Closed" && (
          <div>
            <TableRow title="Time remaining">
              {timeTillExpires < 0 && (
                <div className="font-medium">
                  {-timeTillExpires} days overdue
                </div>
              )}
              {timeTillExpires > 0 && (
                <div className="font-medium">
                  {timeTillExpires} days remaining
                </div>
              )}
            </TableRow>
          </div>
        )}
        <BR />
        <TableRow title="Amount owed">
          <div className="font-medium">
            {totalOwedAmount} {token}
          </div>
        </TableRow>
      </div>
      <ViewContractLink link={transactionHash} />
      {status !== "Closed" && (
        <div>
          <FormValidationWarning message="Withdraw assets from Compound and/or sell on Uniswap." />
          <PrimaryButton text="Repay Loan" onClick={() => onRepayLoan(id)} />
        </div>
      )}
    </div>
  );
};

export default RepaySelectedLoan;
