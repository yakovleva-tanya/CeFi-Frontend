import React, { useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import PrimaryButton from "../UI/PrimaryButton";
import { repayLoan } from "../../actions/DashboardBorrowActions";
import FormValidationWarning from "../UI/FormValidationWarning";
import { DashboardContext } from "../../context/dashboardContext";

const SelectedLoan = () => {
  const currentTime = Date.now();

  const { repayProcessState } = useContext(DashboardContext);
  const {
    setRepaying,
    selectedLoan,
    setSelectedLoan,
    setRepaySuccess,
  } = repayProcessState;

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
        <TableRow title="Interest Rate">
          <div className="font-medium">{selectedLoan.interestRate}%</div>
        </TableRow>
        <BR />
        <TableRow title="Loan size">
          <div className="font-medium">
            {selectedLoan.loanSize} {selectedLoan.lendWith}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan term">
          <div className="font-medium">{selectedLoan.loanTerm} Days</div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium">{selectedLoan.loanType}</div>
        </TableRow>
        <BR />
        <TableRow title="Liquidation %">
          <div className="font-medium">{selectedLoan.liquidation}%</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral %">
          <div className="font-medium">{selectedLoan.collateralPercent}%</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral amount">
          <div className="font-medium">
            {selectedLoan.collateralAmount} {selectedLoan.collateralWith}
          </div>
        </TableRow>
      </div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title="Status">
          <div className="font-medium">{selectedLoan.status}</div>
        </TableRow>
        <BR />
        {selectedLoan.status !== "Repaid" && (
          <div>
            <TableRow title="Time remaining">
              {selectedLoan.status === "Overdue" && (
                <div className="font-medium">
                  {Math.round(
                    (currentTime - selectedLoan.due) / (60 * 60 * 24 * 1000)
                  )}{" "}
                  days overdue
                </div>
              )}
              {selectedLoan.status === "Outstanding" && (
                <div className="font-medium">
                  {Math.round(
                    (selectedLoan.due - currentTime) / (60 * 60 * 24 * 1000)
                  )}{" "}
                  days remaining
                </div>
              )}
            </TableRow>
          </div>
        )}
        <TableRow title="Amount owed">
          <div className="font-medium">
            {selectedLoan.amountOwed} {selectedLoan.lendWith}
          </div>
        </TableRow>
      </div>
      <div className="text-right mb-5">
        <u>View contract</u>
      </div>
      {selectedLoan.status !== "Repaid" && (
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

export default SelectedLoan;
