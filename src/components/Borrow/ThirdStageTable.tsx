import React from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { MockSubmitButton } from "../UI/CustomSubmitButton";

const ThirdStageTable = () => {
  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Interest Rate">
          <div className="font-medium"> 50% </div>
        </TableRow>
        <BR />
        <TableRow title="Min.collateral needed">
          <div className="font-medium"> 100% </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Size">
          <div className="font-medium"> 200 DAI </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Term">
          <div className="font-medium"> 1 day </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Type">
          <div className="font-medium"> Fixed </div>
        </TableRow>
      </div>
      <div className="table border-thin my-5">
        <TableRow title="Collateral Amount">
          <div className="font-medium"> box </div>
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
