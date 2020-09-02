import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import { repayLoan } from "../../../actions/DashboardBorrowActions";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { BorrowRepayContext } from "../../../context/dashboardContext";

const RepaySelectedLoan = () => {
  const currentTime = Date.now();

  const {
    setRepaying,
    selectedLoan,
    setSelectedLoan,
    setRepaySuccess,
  } = useContext(BorrowRepayContext);

  const onRepayLoan = async (id: string) => {
    setRepaying(true);
    setSelectedLoan(null);
    const res = await repayLoan(id);
    setRepaying(false);
    setRepaySuccess(res);
  };
  const timeTillExpires = Math.round(
    (currentTime - selectedLoan.terms.expiryAt) / (60 * 60 * 24 * 1000)
  );
  return (
    <div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="Interest Rate">
          <div className="font-medium">{selectedLoan.terms.interestRate}%</div>
        </TableRow>
        <BR />
        <TableRow title="Loan size">
          <div className="font-medium">
            {selectedLoan.amountBorrowed} {selectedLoan.token}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan term">
          <div className="font-medium">{selectedLoan.terms.duration} Days</div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium">-</div>
        </TableRow>
        <BR />
        <TableRow title="Liquidation %">
          <div className="font-medium">%</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral %">
          <div className="font-medium">%</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral amount">
          <div className="font-medium">
            {selectedLoan.totalCollateralDepositsAmount}{" "}
            {selectedLoan.collateralToken}
          </div>
        </TableRow>
      </div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="Status">
          <div className="font-medium">{selectedLoan.status}</div>
        </TableRow>
        <BR />
        {selectedLoan.status !== "Closed" && (
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
        <TableRow title="Amount owed">
          <div className="font-medium">
            {selectedLoan.totalOwedAmount} {selectedLoan.token}
          </div>
        </TableRow>
      </div>
      <div className="text-right mb-5">
        <u>View contract</u>
      </div>
      {selectedLoan.status !== "Closed" && (
        <div>
          <FormValidationWarning message="Withdraw assets from Compound and/or sell on Uniswap." />
          <PrimaryButton
            text="Repay Loan"
            onClick={() => onRepayLoan(selectedLoan.id)}
          />
        </div>
      )}
    </div>
  );
};

export default RepaySelectedLoan;
