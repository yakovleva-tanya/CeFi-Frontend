import React, { useContext, useState } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import { BorrowPageContext } from "../../context/borrowContext";
import CollateralAmountSelection from "./CollateralAmountSelection";

const ThirdStageTable = () => {
  const { borrowRequest, setBorrowRequest, loanTerms } = useContext(
    BorrowPageContext
  );
  const { loanSize, loanTerm, loanType, lendWith } = borrowRequest;
  const { interestRate, minCollateralNeeded } = loanTerms;
  const [approveLoading, setApproveLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);

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
          <div className="font-medium">
            {" "}
            {loanSize} {lendWith}{" "}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Term">
          <div className="font-medium">
            {" "}
            {loanTerm} {loanTerm % 10 == 1 ? "day" : "days"}{" "}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan Type">
          <div className="font-medium"> {loanType} </div>
        </TableRow>
      </div>
      <div className="table border-thin my-5">
        <TableRow title="Collateral Amount">
          <CollateralAmountSelection />
        </TableRow>
        <BR />
        <TableRow title="Collateral Approval">
          <CustomSubmitButton
            onClickAction={async() => {
              setApproveLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setBorrowRequest({
                ...borrowRequest,
                approved: true,
              });
              setApproveLoading(false);
            }}
            disabled={false}
            loading={approveLoading}
            approved={borrowRequest.approved}
            text="Submit"
          />
        </TableRow>
        <BR />
        <TableRow title="Transfer Collateral">
          <CustomSubmitButton
            onClickAction={async () => {
              setTransferLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setBorrowRequest({
                ...borrowRequest,
                transfered: true,
              });
              setTransferLoading(false);
            }}
            disabled={!borrowRequest.approved}
            loading={transferLoading}
            approved={borrowRequest.transfered}
            text="Submit"
          />
        </TableRow>
      </div>
    </div>
  );
};

export default ThirdStageTable;
