import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import { repayLoan } from "../../../actions/DashboardBorrowActions";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { BorrowRepayContext } from "../../../context/dashboardContext";
import ViewContractLink from "../ViewContractLink";
import { AppContext, BaseTokens, TellerTokens } from "../../../context/app";
import copy from "../../../copy.json";

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
    loanType,
  } = selectedLoan;
  const { state } = useContext(AppContext);
  const { web3State } = state;
  const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
    TellerTokens.tDAI
  ];

  const onRepayLoan = async (id: string, totalOwedAmount: number) => {
    setRepaying(true);
    setSelectedLoan(null);
    const res = await repayLoan(loansInstance, id, totalOwedAmount, web3State);
    setRepaying(false);
    setRepaySuccess(res);
  };

  const pageCopy = copy.pages.dashboard["borrow-repay"];

  return (
    <div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title={pageCopy.selectedLoan.apr}>
          <div className="font-medium">{terms.interestRate}%</div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.loanSize}>
          <div className="font-medium">
            {amountBorrowed} {token}
          </div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.loanTerm}>
          <div className="font-medium">
            {terms.duration} {terms.duration % 10 === 1 ? "day" : "days"}
          </div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.loanType}>
          <div className="font-medium">{loanType}</div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.liquidationPercent}>
          <div className="font-medium">{terms.collateralRatio} %</div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.collateralPercent}>
          <div className="font-medium">
            {currentCollateralPercent.toFixed(2)} %
          </div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.selectedLoan.collateralAmount}>
          <div className="font-medium">
            {collateralAmount} {collateralToken}
          </div>
        </TableRow>
      </div>
      <div className="table border-thin mb-4 mt-3">
        <TableRow title={pageCopy.selectedLoan.status}>
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
        <TableRow title={pageCopy.selectedLoan.amountOwed}>
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
            text={pageCopy.selectedLoan.CTA}
            onClick={() => onRepayLoan(id, totalOwedAmount)}
          />
        </div>
      )}
    </div>
  );
};

export default RepaySelectedLoan;
