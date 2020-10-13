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

import { sendLendingApplication, arrowheadCRA } from "../../models/ArrowheadCRA";
import { getLendingPoolDecimals } from "../../models/Contracts";
import { createLoanWithTerms, takeOutLoan, convertToBN } from "../../models/LoansInterfaceContract";
import { hashRequest } from "../../util/hash";
import { _nonce } from '../../util/nonce';
import { LoanTerms } from "../../context/types";
const Big = 'big.js'

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
    const { lendingPool, loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
    try {
      const tokenDecimals = await getLendingPoolDecimals(
        lendingPool,
        web3State
      );
      console.log('borrowRequest  ', borrowRequest);
      setBorrowRequest({
        ...borrowRequest,
        requestNonce: await _nonce(web3State.address, borrowRequest.lendWith, borrowRequest.collateralWith)
      });

      const lendingApplication = LendingApplicationMap(
        borrowRequest,
        dataProviderResponse.bankInfo,
        tokenDecimals,
        web3State
      );
      console.log("APPLICATION>>>", lendingApplication);
      // const terms = await sendLendingApplication(lendingApplication);
      const terms = await arrowheadCRA(lendingApplication);
      console.log("TERMS>>>", terms);
      setLoanTerms(terms);
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
    console.log("ACCEPTED_TERMS<>");
    console.log(loanTerms);
    const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
    const loanTermsList = loanTerms as unknown as LoanTerms[];
    console.log(loanTermsList.length);
    const finalLoanTerms = loanTermsList.map(terms => ({
      collateralRatio: terms.collateralRatio,
      consensusAddress: terms.consensusAddress,
      responseTime: terms.responseTime,
      interestRate: terms.interestRate,
      //minCollateralNeeded: terms.minCollateralNeeded,
      maxLoanAmount: terms.maxLoanAmount,
      signature: {
        v: parseInt(terms.signature.v.toString()),
        s: terms.signature.s,
        r: terms.signature.r,
        signerNonce: parseInt(terms.signature.signerNonce.toString()),
      },
      signer: terms.signer,
    }));
    console.log(finalLoanTerms);

    try {      
      const response = await createLoanWithTerms(
        borrowRequest,
        finalLoanTerms,//loanTerms,
        loansInstance,
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
