import React, { useContext } from "react";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import {
  DashboardContext,
  BorrowRepayContext,
} from "../../../context/dashboardContext";
import { LoanInterface } from "../../../context/types";

const RepayForm = () => {
  const { loans } = useContext(DashboardContext);

  const currentTime = Date.now();

  const overdueLoans = loans.filter((loan: LoanInterface) => {
    return (loan.statusName === "Overdue")
  });
  const outstandingLoans = loans.filter((loan: LoanInterface) => {
    return (loan.statusName === "Outstanding");
  });
  const repaidLoans = loans.filter((loan: LoanInterface) => {
    return (loan.statusName === "Repaid");
  });
  const { setSelectedLoan } = useContext(BorrowRepayContext);

  return (
    <div>
      {outstandingLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">Outstanding loans</div>
          <div className="table border-thin mb-4 mt-3">
            {outstandingLoans.map((loan: LoanInterface) => {
              return (
                <div key={loan.id}>
                  <TableRow
                    title={`${Math.round(
                      (currentTime - loan.terms.expiryAt ) / (60 * 60 * 24 * 1000)
                    )} days remaining`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  <BR />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {overdueLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">Overdue loans</div>
          <div className="table border-thin mb-4 mt-3">
            {overdueLoans.map((loan: LoanInterface) => {
              return (
                <div key={loan.id}>
                  <TableRow
                    title={`${Math.round(
                      ( loan.terms.expiryAt - currentTime ) / (60 * 60 * 24 * 1000)
                    )} days overdue`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  <BR />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {repaidLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">Repaid loans</div>
          <div className="table border-thin mb-4 mt-3">
            {repaidLoans.map((loan: LoanInterface) => {
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
                  <BR />
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
