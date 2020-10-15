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
  BaseTokens,
} from "../../context/app";
import {
  approveToken,
  depositCollateral,
} from "../../models/LoansInterfaceContract";

const ThirdStageTable = () => {
  const { borrowRequest, loanTerms } = useContext(BorrowPageContext);
  const { loanTerm, loanType, lendWith, collateralWith } = borrowRequest;
  const { interestRate, collateralRatio, maxLoanAmount } = loanTerms[0];
  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Interest rate">
          <div className="font-medium"> {interestRate} % </div>
        </TableRow>
        <BR />
        {Number(collateralRatio) > 0 && (
          <div>
            <TableRow title="Collateral ratio">
              <div className="font-medium"> {collateralRatio} % </div>
            </TableRow>
            <BR />
          </div>
        )}
        <TableRow title="Loan size">
          <div className="font-medium">
            {" "}
            {maxLoanAmount} {lendWith}{" "}
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
        {Number(collateralRatio) > 0 && (
          <>
            <TableRow title="Collateral amount">
              <CollateralAmountSelection />
            </TableRow>
            <BR />
          </>
        )}
        {collateralWith !== "ETH" && (
          <>
            <TableRow title="Approve collateral">
              <CollateralApproveButton />
            </TableRow>
            <BR />
          </>
        )}
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
  const { borrowRequest, setBorrowRequest, loanTerms } = useContext(
    BorrowPageContext
  );
  const { state, updateAppState } = useContext(AppContext);
  return (
    <CustomSubmitButton
      onClickAction={async () => {
        const { web3State } = state;
        const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
          TellerTokens.tDAI
        ];
        try {
          setApproveLoading(true);
          const borrower = state.web3State.address;
          const amountToBorrow = Number(loanTerms[0].maxLoanAmount);
          if (process.env.INTEGRATIONS_DISABLED === "false") {
            const response = await approveToken(
              loansInstance,
              web3State,
              borrower,
              amountToBorrow
            );
            console.log(response);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
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
                "An error occurred during the loan creation process. Please try again.",
              title: "Error",
            };
            return { ...st, errorModal };
          });
        }
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
        setTransferLoading(true);
        if (process.env.INTEGRATIONS_DISABLED === "true") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setBorrowRequest({
            ...borrowRequest,
            transferred: true,
          });
          setTransferLoading(false);
          return true;
        }

        const { web3State } = state;
        const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
          TellerTokens.tDAI
        ];
        try {
          const borrower = state.web3State.address;
          const borrowerLoans = await loansInstance.getBorrowerLoans(borrower);
          if (borrowerLoans.length == 0) {
            setTransferLoading(false);
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
                "An error occurred while taking out the loan. Please try again.",
              title: "Error",
            };
            return { ...st, errorModal };
          });
          setTransferLoading(false);
          return false;
        }
      }}
      disabled={
        borrowRequest.collateralWith === "ETH" ? false : !borrowRequest.approved
      }
      loading={transferLoading}
      approved={borrowRequest.transferred}
      text="Submit"
    />
  );
};
