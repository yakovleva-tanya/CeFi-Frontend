import React from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";

const SecondStageTable = () => {
  return (
    <div className="table border-thin my-5">
      <TableRow title="Interest Rate">
        <div className="font-medium"> 20% </div>
      </TableRow>
      <BR />
      <TableRow title="Min. collateral needed">
        <div className="font-medium"> 100% </div>
      </TableRow>
      <BR />
      <TableRow title="Loan size">
        <div className="font-medium"> 200DAI </div>
      </TableRow>
    </div>
  );
};

export default SecondStageTable;
