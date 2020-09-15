import React, { createContext, useState } from "react";
import { LendingApplication } from "../models/ArrowheadCRA";
import {
  Web3State,
  BankInfoResponseInterface,
  AvailableLendingTokens,
  BaseTokens,
} from "../context/app";
import {
  ContextProps,
  BorrowRequest,
  BorrowPageContextInterface
} from "./types";

const DAYS = 86400; // Seconds per day

export const LendingApplicationMap = (
  borrowRequest: BorrowRequest,
  bankInfoResponse: BankInfoResponseInterface | null,
  nonceDataResponse: any,
  tokenDecimals: number,
  web3State: Web3State
): LendingApplication => {
  const nonce = nonceDataResponse.data?.nonce;
  const nonceSignature = nonceDataResponse.data?.nonceSignature;
  const lendingApplication = {
    borrowedAsset: borrowRequest.lendWith,
    collateralAsset: borrowRequest.collateralWith,
    requestedLoanSize: borrowRequest.loanSize * tokenDecimals,
    loanTermLength: borrowRequest.loanTerm * DAYS,
    collateralPercentEntered: borrowRequest.collateralPercent / 100,
    loanUse: borrowRequest.loanType.toUpperCase(),
    ethereumWallet: web3State.address,
    assetReportStringified:
      bankInfoResponse &&
      JSON.stringify(bankInfoResponse.assetReportStringified),
    assetReportSignature:
      bankInfoResponse && bankInfoResponse.assetReportSignature,
    nonce,
    nonceSignature,
  };
  return lendingApplication as LendingApplication;
};

const defaultBorrowRequest = {
  loanSize: 100,
  loanTerm: 1,
  collateralWith: BaseTokens.ETH,
  collateralPercent: 150,
  loanType: "Secured",
  bankConnected: false,
  lendWith: AvailableLendingTokens.DAI,
  collateralAmount: 0,
  approved: false,
  transferred: false,
};
const mockLoanTerms = {
  interestRate: 20,
  collateralRatio: 100,
  maxLoanAmount: 100,
};

const LoanTerms = {
  interestRate: null as null,
  collateralRatio: null as null,
  maxLoanAmount: null as null,
};

export const BorrowPageContext = createContext<BorrowPageContextInterface>({
  stage: 0,
  setStage: () => {},
  submenu: null as null,
  setSubmenu: () => {},
  borrowRequest: defaultBorrowRequest,
  setBorrowRequest: () => {},
  loanTerms: LoanTerms,
  setLoanTerms: () => {},
  borrowProcessState: null,

});

const BorrowPageContextProvider = ({ children }: ContextProps) => {
  const [stage, setStage] = useState(0);
  const [submenu, setSubmenu] = useState(null as null);
  const [borrowRequest, setBorrowRequest] = useState(defaultBorrowRequest);
  const [loanTerms, setLoanTerms] = useState(LoanTerms);

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRequesting, setRequesting] = useState(false);
  const [stageChangeWarning, setStageChangeWarning] = useState(null);

  const borrowProcessState = {
    success,
    setSuccess,
    isSubmitting,
    setSubmitting,
    isRequesting,
    setRequesting,
    stageChangeWarning,
    setStageChangeWarning,
  };

  return (
    <BorrowPageContext.Provider
      value={{
        stage,
        setStage,
        submenu,
        setSubmenu,
        borrowRequest,
        setBorrowRequest,
        loanTerms,
        setLoanTerms,
        borrowProcessState,
      }}
    >
      {children}
    </BorrowPageContext.Provider>
  );
};
export default BorrowPageContextProvider;
