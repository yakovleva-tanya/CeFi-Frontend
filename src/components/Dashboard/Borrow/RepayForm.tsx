import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import {
  DashboardContext,
  BorrowRepayContext,
} from "../../../context/dashboardContext";
import { LoanInterface } from "../../../context/types";
import copy from "../../../copy.json";

const RepayForm = () => {
  const { loans } = useContext(DashboardContext);

  const currentTime = Date.now();

  const overdueLoans = loans
    ? loans.filter((loan: LoanInterface) => {
        return loan.statusName === "Overdue";
      })
    : null;
  const outstandingLoans = loans
    ? loans.filter((loan: LoanInterface) => {
        return loan.statusName === "Outstanding";
      })
    : null;
  const repaidLoans = loans
    ? loans.filter((loan: LoanInterface) => {
        return loan.statusName === "Repaid";
      })
    : null;
  const { setSelectedLoan } = useContext(BorrowRepayContext);

  const pageCopy = copy.pages.dashboard["borrow-repay"];
  return (
    <div>
      {outstandingLoans && outstandingLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">{pageCopy.outstandingLoansTitle}</div>
          <div className="table border-thin mb-4 mt-3">
            {outstandingLoans.map((loan: LoanInterface, i: number) => {
              const days = Math.round(
                (loan.terms.expiryAt - currentTime) / (60 * 60 * 24 * 1000)
              );
              return (
                <div key={loan.id}>
                  <TableRow
                    title={`${days} ${
                      days % 10 === 1 ? "day" : "days"
                    } remaining`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  {i !== outstandingLoans.length - 1 && <BR />}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {overdueLoans && overdueLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">{pageCopy.overdueLoansTitle}</div>
          <div className="table border-thin mb-4 mt-3">
            {overdueLoans.map((loan: LoanInterface, i: number) => {
              const days = Math.round(
                (currentTime - loan.terms.expiryAt) / (60 * 60 * 24 * 1000)
              );
              return (
                <div key={loan.id}>
                  <TableRow
                    title={`${days} ${
                      days % 10 === 1 ? "day" : "days"
                    } overdue`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  {i !== overdueLoans.length - 1 && <BR />}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {repaidLoans && repaidLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">{pageCopy.closedLoansTitle}</div>
          <div className="table border-thin mb-4 mt-3">
            {repaidLoans.map((loan: LoanInterface, i: number) => {
              return (
                <div key={loan.id}>
                  <TableRow title={`ID ${loan.id}`}>
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  {i !== repaidLoans.length - 1 && <BR />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default RepayForm;
