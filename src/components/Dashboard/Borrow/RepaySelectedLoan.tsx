import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import { repayLoan } from "../../../actions/DashboardBorrowActions";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { BorrowRepayContext } from "../../../context/dashboardContext";
import ViewContractLink from "../ViewContractLink";
import { AppContext, AppContextState } from "../../../context/app";
import { LoanInterface, StatusTypes } from "../../../context/types";

const RepaySelectedLoan = () => {
  const { updateAppState } = useContext(AppContext);

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
    loanType,
  } = selectedLoan;

  const onRepayLoan = async (selectedLoan: LoanInterface) => {
    setRepaying(true);
    setSelectedLoan(null);
    updateAppState((st: AppContextState) => {
      const filteredLoans = st.demoData.loans.filter((loan: LoanInterface) => {
        return loan.id != id;
      });
      const walletBalances = st.demoData.walletBalances;
      const amount = selectedLoan.totalOwedAmount;
      walletBalances[selectedLoan.token] -= amount;
      selectedLoan = {
        ...selectedLoan,
        status: StatusTypes["Closed"],
        totalOwedAmount: 0,
        totalRepaidAmount: selectedLoan.totalOwedAmount,
      };
      const loans = [...filteredLoans, selectedLoan];
      const demoData = { ...st.demoData, walletBalances, loans };
      return { ...st, demoData };
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRepaying(false);
    setRepaySuccess(true);
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
          <div className="font-medium">
            {terms.duration} {terms.duration % 10 === 1 ? "day" : "days"}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium">{loanType}</div>
        </TableRow>
        <BR />
        <TableRow title="Liquidation %">
          <div className="font-medium">{terms.collateralRatio} %</div>
        </TableRow>
        <BR />
        <TableRow title="Collateral %">
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
                  {`${timeTillExpires} ${
                    timeTillExpires % 10 === 1 ? "day" : "days"
                  } remaining`}
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
          {/* <FormValidationWarning message="Withdraw assets from Compound and/or sell on Uniswap." /> */}
          <PrimaryButton
            text="Repay Loan"
            onClick={() => onRepayLoan(selectedLoan)}
          />
        </div>
      )}
    </div>
  );
};

export default RepaySelectedLoan;
