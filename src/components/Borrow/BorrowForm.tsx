import React, { useContext } from "react";

import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import PrimaryButton from "../UI/PrimaryButton";
import LoginButton from "../LoginButton/LoginButton";
import Submenu from "./Submenu";
import LoanSelectCard from './LoanSelectedCard';

import FetchTokenData from '../../models/FetchTokenData';

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
import { createLoanWithTerms, takeOutLoan, convertToBN } from "../../models/LoansInterfaceContract";
import { sign } from "crypto";

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
      setBorrowRequest({
        ...borrowRequest,
        requestTime: Math.floor(Date.now()/1000)
      });
      const lendingApplication = LendingApplicationMap(
        borrowRequest,
        dataProviderResponse.bankInfo,
        tokenDecimals,
        web3State
      );
      console.log("APPLICATION>>>", lendingApplication);
      const terms = await sendLendingApplication(lendingApplication);
      console.log("TERMS>>>", terms.data);
      const response = terms.data.result.response;
      const signature = terms.data.result.signature;
      
      const tokenData = await FetchTokenData();
      const minCollateral =  (Number(tokenData.DAI.price)*borrowRequest.loanSize*response.collateralRatio)/(Number(tokenData.ETH.price));
      
      const resTime = Math.floor(Date.now()/1000) + 10;
      const loanResponse = {
        collateralRatio: response.collateralRatio.toFixed(2),
        consensusAddress: response.consensusAddress,
        responseTime: Number(resTime),
        interestRate: response.interestRate.toFixed(3),
        minCollateralNeeded: minCollateral,
        maxLoanAmount: convertToBN(response.maxLoanAmount),
        nonce: convertToBN(response.nonce),
        signature: {
          signerNonce: convertToBN(response.nonce),
          r: Buffer.from(signature.r),
          s: Buffer.from(signature.s, 'hex'),
          v: Number(signature.v)
        },
        signer: "0x925082d9878D0A1F7630a0EF73E22fF3fb0ae38f"
      };
      setLoanTerms(loanResponse);
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
        console.log("VALUE<>", amountToBorrow);
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
  };

  const onRequestLoanMock = async () => {
    setRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequesting(false);
    setSuccess(true);
  };

  const onAcceptTerms = async () => {
    console.log("ACCEPTED_TERMS<>", loanTerms);
    const { web3State } = state;
    const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
    console.log('loan...', loansInstance.options.address)
    const loanRequest = {
      borrower: state.web3State.address,
      recipient: state.web3State.address,
      consensusAddress: loanTerms.consensusAddress,
      requestNonce: convertToBN(loanTerms.nonce.toString()),
      amount: convertToBN(borrowRequest.loanSize.toString()),
      duration: borrowRequest.loanTerm,
      requestTime: convertToBN(borrowRequest.requestTime.toString())
    };
    const loanResponses = {
      signer: loanTerms.signer,
      consensusAddress: loanTerms.consensusAddress,
      responseTime: convertToBN(loanTerms.responseTime.toString()),
      interestRate: convertToBN(loanTerms.interestRate.toString()),
      collateralRatio: convertToBN(loanTerms.collateralRatio.toString()),
      maxLoanAmount: convertToBN(loanTerms.maxLoanAmount.toString()),
      signature: loanTerms.signature
      }
    try {
      const collateral = loanTerms.minCollateralNeeded.toString();
      const response = await createLoanWithTerms(
        loanRequest,
        loanResponses,
        loansInstance,
        collateral,
        state.web3State.address
      );
      console.log("CREATE_RESPONSE<>", response);
      console.log('req', borrowRequest);
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
                  onClick={async () => {
                    //Get LoanTerms
                    await requestLoan();
                    // await onTestLoan();
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
