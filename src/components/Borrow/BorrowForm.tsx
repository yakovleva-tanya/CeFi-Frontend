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
import { loansTestData } from "../../context/testdata";

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
    setRequesting(true);
    updateAppState((st: AppContextState) => {
      const {
        loanSize,
        loanTerm,
        collateralWith,
        collateralPercent,
        lendWith,
        collateralAmount,
        loanType,
      } = borrowRequest;
      const loans = st.demoData.loans;
      const time = Date.now();
      const expiryDate = time + loanTerm * 86400000;
      loans.push({
        id: `126${loans.length + 1}`,
        token: lendWith,
        collateralToken: collateralWith,
        transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
        terms: {
          interestRate: loanTerms.interestRate,
          collateralRatio: collateralPercent,
          maxLoanAmount: loanSize,
          duration: loanTerm,
          expiryAt: expiryDate,
        },
        startDate: time,
        endDate: expiryDate,
        amountBorrowed: loanSize,
        status: "Active",
        repayments: [{ amount: 0 }],
        totalRepaidAmount: 0,
        totalOwedAmount: loanSize,
        collateralDeposits: [{ amount: 0 }],
        totalCollateralDepositsAmount: collateralAmount,
        collateralAmount: collateralAmount,
        collateralWithdrawns: [],
        totalCollateralWithdrawalsAmount: 0,
        loanType: loanType,
        compound: {
          supplied: 0,
          earned: 0,
        },
      });
      const walletBalances = st.demoData.walletBalances;
      walletBalances[collateralWith] -= collateralAmount;
      walletBalances[lendWith] += loanSize;
      const demoData = { ...st.demoData, walletBalances, loans };
      return { ...st, demoData };
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequesting(false);
    setSuccess(true);
  };
  const onRequestLoanMock = async () => {
    setRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRequesting(false);
    setSuccess(true);
  };
  const onAcceptTerms = async () => {
    setSubmitting(true);
    //Accept loan terms
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    setStage(stage + 1);
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
                  //disabled={isSecured ? false : Boolean(!plaidConnected)}
                  onClick={() => {
                    //Get LoanTerms
                    setLoanTerms({
                      ...loanTerms,
                      interestRate:
                        borrowRequest.loanType === "Secured" ? 200 : 17,
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
                onClick={onRequestLoan}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BorrowForm;
