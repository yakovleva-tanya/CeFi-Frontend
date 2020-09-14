import React, { useContext, useState } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import { BorrowPageContext } from "../../context/borrowContext";
import CollateralAmountSelection from "./CollateralAmountSelection";

const ThirdStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { loanSize, loanTerm, loanType, lendWith } = borrowRequest;
  const { interestRate, minCollateralNeeded } = loanTerms;
  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Interest rate">
          <div className="font-medium"> {interestRate} % </div>
        </TableRow>
        <BR />
        {minCollateralNeeded > 0 && (
          <div>
            <TableRow title="Collateral ratio">
              <div className="font-medium"> {minCollateralNeeded} % </div>
            </TableRow>
            <BR />
          </div>
        )}
        <TableRow title="Loan size">
          <div className="font-medium">
            {" "}
            {loanSize} {lendWith}{" "}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan term">
          <div className="font-medium">
            {" "}
            {loanTerm} {loanTerm % 10 == 1 ? "day" : "days"}{" "}
          </div>
        </TableRow>
        <BR />
        <TableRow title="Loan type">
          <div className="font-medium"> {loanType} </div>
        </TableRow>
      </div>
      <div className="table border-thin my-4">
        <TableRow title="Collateral amount">
          <CollateralAmountSelection />
        </TableRow>
        <BR />
        <TableRow title="Approve collateral">
          <CollateralApproveButton />
        </TableRow>
        <BR />
        <TableRow title="Deposit collateral">
          <CollateralTransferButton />
        </TableRow>
      </div>
    </div>
  );
};

export default ThirdStageTable;

const CollateralApproveButton = () => {
  const [approveLoading, setApproveLoading] = useState(false);
  const { borrowRequest, setBorrowRequest } = useContext(BorrowPageContext);
  return (
    <CustomSubmitButton
      onClickAction={async () => {
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
  );
};

const CollateralTransferButton = () => {
  const [transferLoading, setTransferLoading] = useState(false);
  const { borrowRequest, setBorrowRequest } = useContext(BorrowPageContext);
  return (
    <CustomSubmitButton
      onClickAction={async () => {
        setTransferLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBorrowRequest({
          ...borrowRequest,
          transferred: true,
        });
        setTransferLoading(false);
      }}
      disabled={!borrowRequest.approved}
      loading={transferLoading}
      approved={borrowRequest.transferred}
      text="Submit"
    />
  );
};
