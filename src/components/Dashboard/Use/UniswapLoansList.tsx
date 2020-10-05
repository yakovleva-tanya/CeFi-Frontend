import React, { useContext } from "react";

import TableRow from "../../UI/TableRow";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";

import { LoanInterface } from "../../../context/types";
import { DashboardContext } from "../../../context/dashboardContext";
import { UniswapContext } from "../../../context/uniswapContext";

const UniswapLoansList = () => {
  const { loans } = useContext(DashboardContext);
  const { setSelectedLoan } = useContext(UniswapContext);
  const securedLoans = loans.filter((loan: LoanInterface) => {
    return loan.loanType === "Secured" && loan.status !== "Closed";
  });

  return (
    <div>
      <div>Swap your assets with Uniswap</div>
      <div className="table border-thin mb-4 mt-3">
        {securedLoans &&
          securedLoans.map((loan: LoanInterface, i: any) => {
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
                {securedLoans.length - 1 !== i && <BR />}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UniswapLoansList;
