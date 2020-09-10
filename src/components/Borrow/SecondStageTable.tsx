import React, { useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { BorrowPageContext } from "../../context/borrowContext";

const SecondStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { loanSize, lendWith, loanType, loanTerm } = borrowRequest;
  const { interestRate, minCollateralNeeded } = loanTerms;

  return (
    <div>
      <div className="mt-5">Your loan terms have been calculated</div>
      <div className="table border-thin my-5">
        <TableRow title="Interest rate">
          <div className="font-medium"> {interestRate} % </div>
        </TableRow>
        <BR />
        {minCollateralNeeded > 0 && (
          <div>
            <TableRow title="Collateral ratio">
              <div className="font-medium">{minCollateralNeeded} % </div>
            </TableRow>
            <BR />
          </div>
        )}
        <TableRow title="Loan size">
          <div className="font-medium">{`${loanSize} ${lendWith}`}</div>
        </TableRow>
        <BR />
        <TableRow title="Loan term">
          <div className="font-medium">{`${loanTerm} ${
            loanTerm % 10 === 1 ? "day" : "days"
          }`}</div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium">{`${loanType}`}</div>
        </TableRow>
      </div>
    </div>
  );
};

export default SecondStageTable;
