import React, { useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { BorrowPageContext } from "../../context/borrowContext";

const SecondStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { lendWith, loanType, loanTerm } = borrowRequest;
  const { interestRate, collateralRatio, maxLoanAmount} = loanTerms[0];

  return (
    <div>
      <div className="mt-5">Your loan terms have been calculated</div>
      <div className="table border-thin my-5">
        <TableRow title="Interest rate">
          <div className="font-medium"> {Number(interestRate) / 100} % </div>
        </TableRow>
        <BR />
        {Number(collateralRatio) > 0 && (
          <div>
            <TableRow title="Collateral ratio">
              <div className="font-medium">{collateralRatio} % </div>
            </TableRow>
            <BR />
          </div>
        )}
        <TableRow title="Loan size">
          <div className="font-medium">{`${maxLoanAmount} ${lendWith}`}</div>
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
