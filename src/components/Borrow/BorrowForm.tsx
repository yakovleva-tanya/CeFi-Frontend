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

import { getLendingPoolDecimals } from "../../models/Contracts";
import { takeOutLoan } from "../../models/LoansInterfaceContract";
import { _nonce } from '../../util/nonce';
import { getNodeSignaturesForBorrowing, PBorrow, RArrowheadCRA, submitSignaturesToChainForBorrowing } from "../../services/borrow";
const Big = 'big.js'
import { getNonce } from "../../models/DataProviders";

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
    lendingApp,
    setLendingApp
  } = useContext(BorrowPageContext);
  const { state, updateAppState } = useContext(AppContext);
  const { setRequesting, setSuccess, setSubmitting } = borrowProcessState;
  const { web3State } = state;

  const requestLoan = async () => {
    const { dataProviderResponse } = state;
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

      const lendingApplication = LendingApplicationMap(
        borrowRequest,
        dataProviderResponse.bankInfo,
        tokenDecimals,
        web3State
      );
      console.log("APPLICATION>>>", lendingApplication);
 
      setLendingApp(lendingApplication);

      setBorrowRequest({
        ...borrowRequest,
        requestTime: lendingApplication.requestTime
      })

      const nodeResponses = await getNodeSignaturesForBorrowing(
        lendingApplication as PBorrow 
      );

      console.log('responses<>', nodeResponses);

      setLoanTerms(nodeResponses);
      return true;
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
    const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
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
  const onAcceptTerms = async (borrowNonce: any) => {
    console.log("ACCEPTED_TERMS<>");
    console.log(loanTerms);
    const { web3State } = state;
    const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];

    try {      
      console.log('lendingApp', lendingApp);

      const reqNonce = Number(await _nonce(web3State.address, borrowRequest.lendWith, borrowRequest.collateralWith));
      console.log('nodeRes<>', loanTerms);
      console.log('stored nonce<>', String(reqNonce));

      const receipt = await submitSignaturesToChainForBorrowing(
        lendingApp as PBorrow,
        loanTerms as unknown as RArrowheadCRA[],
        String(reqNonce + 1),
        lendingApp.requestedLoanSize,
        String(0.01 * 1e18),
        loansInstance
      );

      console.log('Receipt<>', receipt);

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
              <PrimaryButton 
                text="Accept terms"
                onClick={
                  process.env.INTEGRATIONS_DISABLED === "true"
                    ? onAcceptTermsMock
                    : async() => { await onAcceptTerms(borrowRequest.requestNonce) }} />
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
