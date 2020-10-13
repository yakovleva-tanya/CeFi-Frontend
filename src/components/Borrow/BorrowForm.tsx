import React, { useContext } from "react";

import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import PrimaryButton from "../UI/PrimaryButton";
import LoginButton from "../LoginButton/LoginButton";
import Submenu from "./Submenu";
import LoanSelectCard from "./LoanSelectedCard";

import "./borrow.scss";

import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens,
} from "../../context/app";

import {
  BorrowPageContext,
  LendingApplicationMap,
} from "../../context/borrowContext";

import { sendLendingApplication } from "../../models/ArrowheadCRA";
import { getLendingPoolDecimals } from "../../models/Contracts";
import { getNonce } from "../../models/DataProviders";
import {
  createLoanWithTerms,
  takeOutLoan,
} from "../../models/LoansInterfaceContract";

const BorrowForm = () => {
  const {
    stage,
    setStage,
    submenu,
    borrowRequest,
    setBorrowRequest,
    borrowProcessState,
    loanTerms,
    setLoanTerms,
  } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);
  const { setRequesting, setSuccess, setSubmitting } = borrowProcessState;
  const { web3State } = state;

  const requestLoan = async () => {
    const { dataProviderResponse } = state;
    //TODO: this should update based on the selected ATM type.
    const { lendingPool } = state.teller
      ? state.teller.contracts[BaseTokens.ETH][TellerTokens.tDAI]
      : null;
    try {
      const tokenDecimals = await getLendingPoolDecimals(
        lendingPool,
        web3State
      );
      const nonceDataResponse = await getNonce();
      const lendingApplication = LendingApplicationMap(
        borrowRequest,
        dataProviderResponse.bankInfo,
        nonceDataResponse,
        tokenDecimals,
        web3State
      );
      const response: any = await sendLendingApplication(lendingApplication);
      console.log({ response });
      return loanTerms;
    } catch (err) {
      console.log({ err });
      // updateAppState((st: AppContextState) => {
      //   const errorModal = {
      //     show: true,
      //     message:
      //       "An error occurred during the borrowing process. Please try again.",
      //     title: "Error",
      //   };
      //   return { ...st, errorModal };
      // });
      return null;
    }
  };

  const loggedIn = state.web3State?.address || "";
  const onRequestLoan = async () => {
    setRequesting(true);
    const { loansInstance } = state.teller
      ? state.teller.contracts[BaseTokens.ETH][TellerTokens.tDAI]
      : null;
    try {
      const borrower = state.web3State.address;
      const borrowerLoans = await loansInstance.getBorrowerLoans(borrower);
      if (borrowerLoans.length == 0) {
        setRequesting(false);
        return false;
      } else {
        const loanId = borrowerLoans[borrowerLoans.length - 1];
        const amountToBorrow = loanTerms.maxLoanAmount.toString();
        const response = await takeOutLoan(
          loansInstance,
          loanId,
          amountToBorrow,
          borrower
        );
        console.log(response);
        setRequesting(false);
        setStage(stage + 1);
        return true;
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
      setRequesting(false);
      return false;
    }
  };
  const onRequestLoanMock = async () => {
    setRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequesting(false);
    setSuccess(true);
  };
  const onAcceptTermsMock = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    setStage(stage + 1);
  };
  const onAcceptTerms = async () => {
    const { loansInstance } = state.teller
      ? state.teller.contracts[BaseTokens.ETH][TellerTokens.tDAI]
      : null;
    try {
      setSubmitting(true);
      const collateral = borrowRequest.collateralAmount.toString();
      const response = await createLoanWithTerms(
        borrowRequest,
        loanTerms,
        loansInstance,
        collateral,
        state.web3State.address
      );
      console.log(response);
      setSubmitting(false);
      setStage(stage + 1);
      return true;
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
      setSubmitting(false);
      return false;
    }
  };

  const isSecured = Boolean(borrowRequest.loanType === "Secured");
  const plaidConnected = state?.plaid?.loggedIn;
  return (
    <div>
      {submenu ? (
        <Submenu variant={submenu} />
      ) : (
        <div>
          {stage === 0 && (
            <div className="py-3">
              <div className="mt-5">Select your loan type</div>
              <LoanSelectCard
                className="mt-4"
                onClick={() => {
                  setStage(stage + 1);
                  setBorrowRequest({
                    ...borrowRequest,
                    collateralPercent: 0,
                    loanType: "Unsecured",
                  });
                }}
                title="Unsecured loan"
                subTitle="Apply for an unsecured loan by connecting your bank account."
                logos={["compound"]}
              />
              <LoanSelectCard
                className="mt-4"
                onClick={() => {
                  setStage(stage + 1);
                  setBorrowRequest({
                    ...borrowRequest,
                    collateralPercent: 150,
                    loanType: "Secured",
                  });
                }}
                title="Secured loan"
                subTitle="Apply for a secured loan, no bank account needed."
                logos={["compound", "uniswap"]}
              />
            </div>
          )}
          {stage === 1 && (
            <div>
              <FirstStageTable />
              {loggedIn ? (
                <PrimaryButton
                  text="Request terms"
                  disabled={isSecured ? false : Boolean(!plaidConnected)}
                  onClick={() => {
                    const newLoanTerms = {
                      maxLoanAmount: borrowRequest.loanSize,
                      interestRate:
                        borrowRequest.loanType === "Secured" ? 200 : 17,
                      collateralRatio: borrowRequest.collateralPercent,
                    };
                    requestLoan();
                    // if (res) {
                    //   newLoanTerms = {
                    //     maxLoanAmount: res.maxLoanAmount,
                    //     interestRate: res.interestRate,
                    //     collateralRatio: res.collateralRatio,
                    //   };
                    // }
                    setLoanTerms(newLoanTerms);
                    setStage(stage + 1);
                  }}
                />
              ) : (
                <LoginButton />
              )}
            </div>
          )}
          {stage === 2 && (
            <div>
              <SecondStageTable />
              <PrimaryButton
                text="Accept terms"
                onClick={
                  process.env.INTEGRATIONS_DISABLED === "true"
                    ? onAcceptTermsMock
                    : onAcceptTerms
                }
              />
            </div>
          )}
          {stage === 3 && (
            <div>
              <ThirdStageTable />
              <PrimaryButton
                disabled={!borrowRequest.transferred}
                text="Request loan"
                onClick={
                  process.env.INTEGRATIONS_DISABLED === "true"
                    ? onRequestLoanMock
                    : onRequestLoan
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BorrowForm;
