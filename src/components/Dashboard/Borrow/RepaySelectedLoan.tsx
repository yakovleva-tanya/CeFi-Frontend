import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import { repayLoan } from "../../../actions/DashboardBorrowActions";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { BorrowRepayContext } from "../../../context/dashboardContext";
import ViewContractLink from "../ViewContractLink";

const RepaySelectedLoan = () => {
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
    collateralToken,
    totalOwedAmount,
    id,
    transactionHash,
    statusName,
    timeTillExpires,
    currentCollateralPercent,
    collateralAmount,
  } = selectedLoan;

  const onRepayLoan = async (id: string) => {
    setRepaying(true);
    setSelectedLoan(null);
    const res = await repayLoan(id);
    setRepaying(false);
    setRepaySuccess(res);
  };

  return (
    <div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="APR">
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
          <div className="font-medium">
            {currentCollateralPercent.toFixed(2)} %
          </div>
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
        {statusName !== "Repaid" && (
          <div>
            <TableRow title="Time remaining">
              {statusName === "Overdue" && (
                <div className="font-medium">
                  {-timeTillExpires} days overdue
                </div>
              )}
              {statusName === "Outstanding" && (
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
      {statusName !== "Repaid" && (
        <div>
          <FormValidationWarning message="Withdraw assets from Compound and/or sell on Uniswap." />
          <PrimaryButton text="Repay Loan" onClick={() => onRepayLoan(id)} />
        </div>
      )}
    </div>
  );
};

export default RepaySelectedLoan;
