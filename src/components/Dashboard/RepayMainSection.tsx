import React, { useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import { DashboardContext } from "../../context/dashboardContext";

const RepayMainSection = () => {
  const { loans, repayProcessState } = useContext(DashboardContext);
  const currentTime = Date.now();

  const overdueLoans = loans.filter((loan) => {
    return loan.status === "Overdue";
  });
  const outstandingLoans = loans.filter((loan) => {
    return loan.status === "Outstanding";
  });
  const repaidLoans = loans.filter((loan) => {
    return loan.status === "Repaid";
  });

  const { setSelectedLoan } = repayProcessState;

  return (
    <div>
      {outstandingLoans.length > 0 && (
        <div className="mb-4">
          <div className="text-left">Outstanding loans</div>
          <div className="table border-thin mb-4 mt-3">
            {outstandingLoans.map((loan: any) => {
              return (
                <div key={loan.due}>
                  <TableRow
                    title={`${Math.round(
                      (loan.due - currentTime) / (60 * 60 * 24 * 1000)
                    )} days remaining`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.loanSize} ${loan.lendWith}`}
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
            {overdueLoans.map((loan: any) => {
              return (
                <div key={loan.due}>
                  <TableRow
                    title={`${Math.round(
                      (currentTime - loan.due) / (60 * 60 * 24 * 1000)
                    )} days overdue`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.loanSize} ${loan.lendWith}`}
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
            {repaidLoans.map((loan: any) => {
              return (
                <div key={loan.due}>
                  <TableRow title={`ID ${loan.id}`}>
                    <CustomSubmenuLink
                      title={`${loan.loanSize} ${loan.lendWith}`}
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
export default RepayMainSection;
