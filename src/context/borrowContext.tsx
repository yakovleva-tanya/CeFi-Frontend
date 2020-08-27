import React, { createContext, useState } from "react";
import { LendingApplication } from "../models/ArrowheadCRA";
import {
  Web3State,
  BankInfoResponseInterface,
  AvailableLendingTokens,
  BaseTokens,
} from "../context/app";

interface BorrowRequest {
  loanSize: number;
  loanTerm: number;
  collateralWith: BaseTokens;
  collateralPercent: number;
  loanType: string;
  bankConnected: boolean;
  lendWith: AvailableLendingTokens;
  collateralAmount: null | number;
  approved: boolean;
  transferred: boolean;
}

interface LoanTerms {
  interestRate: number;
  minCollateralNeeded: number;
}
interface BorrowProcessInterface {
  success: boolean;
  setSuccess: Function;
  isSubmitting: boolean;
  setSubmitting: Function;
  isRequesting: boolean;
  setRequesting: Function;
  stageChangeWarning: boolean;
  setStageChangeWarning: Function;
}
interface BorrowPageContextInterface {
  stage: number;
  setStage: Function;
  submenu: React.ReactNode;
  setSubmenu: Function;
  borrowRequest: BorrowRequest;
  setBorrowRequest: Function;
  loanTerms: LoanTerms;
  setLoanTerms: Function;
  borrowProcessState: null | BorrowProcessInterface;
}

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
  loanType: "Fixed",
  bankConnected: false,
  lendWith: AvailableLendingTokens.DAI,
  collateralAmount: null as null,
  approved: false,
  transferred: false,
};
const mockLoanTerms = {
  interestRate: 20,
  minCollateralNeeded: 100,
};

export const BorrowPageContext = createContext<BorrowPageContextInterface>({
  stage: 1,
  setStage: () => {},
  submenu: null,
  setSubmenu: () => {},
  borrowRequest: defaultBorrowRequest,
  setBorrowRequest: () => {},
  loanTerms: mockLoanTerms,
  setLoanTerms: () => {},
  borrowProcessState: null,
});

type BorrowPageContextProps = {
  children: React.ReactNode;
};

const BorrowPageContextProvider = ({ children }: BorrowPageContextProps) => {
  const [stage, setStage] = useState(1);
  const [submenu, setSubmenu] = useState(null);
  const [borrowRequest, setBorrowRequest] = useState(defaultBorrowRequest);
  const [loanTerms, setLoanTerms] = useState(mockLoanTerms);

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRequesting, setRequesting] = useState(false);
  const [stageChangeWarning, setStageChangeWarning] = useState(false);

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
