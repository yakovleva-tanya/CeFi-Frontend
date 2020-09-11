import React, { useContext } from "react";

import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import PrimaryButton from "../UI/PrimaryButton";
import LoginButton from "../LoginButton/LoginButton";
import Submenu from "./Submenu";
import LoanSelectCard from './LoanSelectedCard';

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
import { createLoanWithTerms, takeOutLoan } from "../../models/LoansInterfaceContract";

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

  const requestLoan = async () => {
    const { dataProviderResponse, web3State } = state;
    //TODO: this should update based on the selected ATM type.
    const { lendingPool } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
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
      const response = await sendLendingApplication(lendingApplication);
      console.log(response.data);
      return true;
    } catch (err) {
      console.log(err);
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred during the borrowing process. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
      return false;
    }
  };

  const loggedIn = state.web3State?.address || "";
  const onRequestLoan = async () => {
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
        const loanId = borrowerLoans[borrowerLoans.length -1];
        const amountToBorrow = borrowRequest.loanSize.toString();
        const response = await takeOutLoan(
        loansInstance,
        loanId,
        amountToBorrow,
        borrower
      );
      console.log(response);
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitting(false);
      setStage(stage + 1);
      return true;
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
      setSubmitting(true);
      //Accept loan terms
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitting(false);
      return false;
    }
    setRequesting(true);
    const res = await requestLoan();
    setRequesting(false);
    setSuccess(res);
  };
  const onRequestLoanMock = async () => {
    setRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequesting(false);
    setSuccess(true);
  };
  const onAcceptTerms = async () => {
    const { web3State } = state;
    const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
    try {
      const collateral = borrowRequest.collateralAmount.toString();
      const response = await createLoanWithTerms(
        borrowRequest,
        loanTerms,
        loansInstance,
        collateral,
        state.web3State.address
      );
      console.log(response);
      setSubmitting(true);
      //Accept loan terms
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitting(false);
      setStage(stage + 1);
      return true;
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
      setSubmitting(true);
      //Accept loan terms
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
                    loanType: "Unsecured",
                  });
                }}
                title="Unsecured loan"
                subTitle="Apply for an unsecured loan by connecting your bank account."
                logos={['compound']}
              />
              <LoanSelectCard
                className="mt-4"
                onClick={() => {
                  setStage(stage + 1);
                  setBorrowRequest({
                    ...borrowRequest,
                    loanType: "Secured",
                  });
                }}
                title="Secured loan"
                subTitle="Apply for a secured loan, no bank account needed."
                logos={['compound', 'uniswap']}
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
                    //Get LoanTerms
                    setLoanTerms({
                      ...loanTerms,
                      minCollateralNeeded: borrowRequest.collateralPercent,
                    });
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
              <PrimaryButton text="Accept terms" onClick={onAcceptTerms} />
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
