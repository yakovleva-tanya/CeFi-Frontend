import React, {useContext} from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { MockSubmitButton } from "../UI/CustomSubmitButton";
import { BorrowPageContext } from "../../context/borrowContext";
import CollateralAmountSelection from './CollateralAmountSelection';

const ThirdStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { loanSize, loanTerm, loanType, lendWith } = borrowRequest;
  const { interestRate, minCollateralNeeded } = loanTerms;

  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Interest Rate">
          <div className="font-medium"> {interestRate} % </div>
        </TableRow>
        <BR />
        <TableRow title="Min.collateral needed">
          <div className="font-medium"> {minCollateralNeeded} % </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Size">
          <div className="font-medium"> {loanSize} {lendWith} </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Term">
          <div className="font-medium"> {loanTerm} days </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Type">
          <div className="font-medium"> {loanType} </div>
        </TableRow>
      </div>
      <div className="table border-thin my-5">
        <TableRow title="Collateral Amount">
          <CollateralAmountSelection/>
        </TableRow>
        <BR />
        <TableRow title="Collateral Approval">
          <MockSubmitButton text="Submit" />
        </TableRow>
        <BR />
        <TableRow title="Transfer Collateral">
          <MockSubmitButton text="Submit" />
        </TableRow>
      </div>
    </div>
  );
};

export default ThirdStageTable;
