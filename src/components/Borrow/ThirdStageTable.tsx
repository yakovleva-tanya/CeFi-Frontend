import React, { useContext, useState } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import { BorrowPageContext } from "../../context/borrowContext";
import CollateralAmountSelection from "./CollateralAmountSelection";
import { 
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens
} from "../../context/app";
import { approveToken, depositCollateral } from "../../models/LoansInterfaceContract";

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
      <div className="table border-thin my-5">
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
  const { state, updateAppState } = useContext(AppContext);
  return (
    <CustomSubmitButton
      onClickAction={async () => {
        const { web3State } = state;
        const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
          TellerTokens.tDAI
        ];
        try {
          const borrower = state.web3State.address;
          const amountToBorrow = borrowRequest.loanSize;
          const response = await approveToken(
            loansInstance,
            web3State,
            borrower,
            amountToBorrow
          );
          console.log(response);
          setApproveLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setBorrowRequest({
            ...borrowRequest,
            approved: true,
          });
          setApproveLoading(false);
        } catch (err) {
          console.log(err);
          updateAppState((st: AppContextState) => {
            const errorModal = {
              show: true,
              message:
                "An error occurred during the loan creation process. Please try again.", title: "Error",
            };
          return { ...st, errorModal };
        });
        }
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
  const { state, updateAppState } = useContext(AppContext);
  return (
    <CustomSubmitButton
      onClickAction={async () => {
        const { web3State } = state;
        const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
          TellerTokens.tDAI
        ];
        try {
          const borrower = state.web3State.address;
          const borrowerLoans = await loansInstance.getBorrowerLoans(borrower);
          if (borrowerLoans.length == 0) {
            return false;
          } else {
            const loanId = borrowerLoans[borrowerLoans.length - 1];
            const amountToDeposit = borrowRequest.collateralAmount.toString();
            const response = await depositCollateral(
              loansInstance,
              borrower,
              loanId,
              amountToDeposit,
              web3State
            );
            console.log(response);
            setTransferLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setBorrowRequest({
              ...borrowRequest,
              transferred: true,
            });
            setTransferLoading(false);
          }
        } catch (err) {
          console.log(err);
          updateAppState((st: AppContextState) => {
            const errorModal = {
              show: true,
              message:
                "An error occurred while taking out the loan. Please try again.", title: "Error",
            };
            return { ...st, errorModal };
          });
        }
        setTransferLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBorrowRequest({
          ...borrowRequest,
          transferred: true,
        });
        setTransferLoading(false);
        return false;
      }}
      disabled={!borrowRequest.approved}
      loading={transferLoading}
      approved={borrowRequest.transferred}
      text="Submit"
    />
  );
};
