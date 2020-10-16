import React, { useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { BorrowPageContext } from "../../context/borrowContext";
import copy from "../../copy.json";

const SecondStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { lendWith, loanType, loanTerm } = borrowRequest;
  const { interestRate, collateralRatio, maxLoanAmount } = loanTerms;
  const pageCopy = copy.pages.borrow.main.form.step3;

  return (
    <div>
      <div className="mt-5">{pageCopy.description}</div>
      <div className="table border-thin my-5">
        <TableRow title={pageCopy.interestRate}>
          <div className="font-medium"> {interestRate} % </div>
        </TableRow>
        <BR />
        {collateralRatio > 0 && (
          <div>
            <TableRow title={pageCopy.collateralRatio}>
              <div className="font-medium">{collateralRatio} % </div>
            </TableRow>
            <BR />
          </div>
        )}
        <TableRow title={pageCopy.loanSize}>
          <div className="font-medium">{`${maxLoanAmount} ${lendWith}`}</div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.loanTerm}>
          <div className="font-medium">{`${loanTerm} ${
            loanTerm % 10 === 1 ? "day" : "days"
          }`}</div>
        </TableRow>
        <BR />
        <TableRow title={pageCopy.loanType}>
          <div className="font-medium">{`${loanType}`}</div>
        </TableRow>
      </div>
    </div>
  );
};

export default SecondStageTable;
