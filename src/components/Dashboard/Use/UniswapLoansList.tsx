import React, { useContext } from "react";

import TableRow from "../../UI/TableRow";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";

import { LoanInterface } from "../../../context/types";
import { DashboardContext } from "../../../context/dashboardContext";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapLoansList = () => {
  const { loans } = useContext(DashboardContext);
  const { setSelectedLoan } = useContext(UniswapContext);

  return (
    <div>
      <div>Earn interest by supplying to Uniswap.</div>
      <div className="table border-thin mb-4 mt-3">
        {loans &&
          loans.map((loan: LoanInterface) => {
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
  );
};

export default UniswapLoansList;
