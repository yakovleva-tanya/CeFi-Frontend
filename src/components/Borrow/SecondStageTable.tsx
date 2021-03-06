import React, {useContext} from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { BorrowPageContext } from "../../context/borrowContext";

const SecondStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { loanSize, lendWith } = borrowRequest;
  const { interestRate, minCollateralNeeded } = loanTerms;

  return (
    <div className="table border-thin my-5">
      <TableRow title="Interest Rate">
        <div className="font-medium"> {interestRate} % </div>
      </TableRow>
      <BR />
      <TableRow title="Min. collateral needed">
        <div className="font-medium"> {minCollateralNeeded} % </div>
      </TableRow>
      <BR />
      <TableRow title="Loan size">
        <div className="font-medium">{`${loanSize} ${lendWith}`}</div>
      </TableRow>
    </div>
  );
};

export default SecondStageTable;
