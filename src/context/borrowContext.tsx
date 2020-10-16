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
  BorrowPageContextInterface,
  Signature
} from "./types";
import { _nonce } from '../util/nonce';

const DAYS = 86400; // Seconds per day

export const LendingApplicationMap = (
  borrowRequest: BorrowRequest,
  bankInfoResponse: BankInfoResponseInterface | null,
  tokenDecimals: number,
  web3State: Web3State
): LendingApplication => {
  const lendingApplication = {
    borrowedAsset: borrowRequest.lendWith,
    collateralAsset: borrowRequest.collateralWith,
    requestedLoanSize: String(borrowRequest.loanSize * 1e18),
    loanTermLength: String(borrowRequest.loanTerm * DAYS),
    collateralRatioEntered: String(borrowRequest.collateralPercent * 100),
    loanUse: borrowRequest.loanType.toUpperCase(),
    ethereumWallet: web3State.address,
    assetReportStringified: bankInfoResponse && JSON.stringify(bankInfoResponse.assetReportStringified),
    assetReportSignature: bankInfoResponse && bankInfoResponse.assetReportSignature,
    requestTime: String(Math.floor(Date.now()/1000 - 100)),
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
  requestTime: Math.floor(Date.now()/1000),
  requestNonce: 1,
  requestHash: 'C5D2460186F7233C927E7DB2DCC703C0E500B653CA82273B7BFAD8045D85A470 [xdJGAYb3IzySfn2y3McDwOUAtlPKgic7e/rYBF2FpHA=]',
  borrowerAddress: ''
};

const BorrowRequest = {
  loanSize: null as number,
  loanTerm: null as number,
  collateralWith: BaseTokens.ETH,
  collateralPercent: null as number,
  loanType: null as string,
  bankConnected: null as boolean,
  lendWith: AvailableLendingTokens.DAI,
  collateralAmount: null as number,
  approved: null as boolean,
  transferred: null as boolean,
  requestTime: null as number,
  requestNonce: null as number,
  requestHash: null as string,
  borrowerAddress: null as string
};

const mockLoanTerms = {
  interestRate: 20,
  collateralRatio: 100,
  maxLoanAmount: 100,
};

const LoanTerms = [{
  collateralRatio: null as null,
  consensusAddress: null as string,
  responseTime: null as string,
  interestRate: null as null,
  requestHash: null as string,
  minCollateralNeeded: null as string,
  maxLoanAmount: null as null,
  signature: null as string,
  signer: null as string,
  signerNonce: null as string,
  chainId: null as string,
}];

const LendingApp = {
  requestedLoanSize: null as string,
  borrowedAsset: null as string,
  collateralAsset: null as string,
  loanTermLength: null as string, // seconds
  collateralRatioEntered: null as string, // 100% === 10000
  loanUse: null as string,
  ethereumWallet: null as string,
  assetReportStringified: null as string,
  assetReportSignature: null as string, 
  requestTime: null as string, // seconds at least 100 in the past
  requestNonce: null as string
}

export const BorrowPageContext = createContext<BorrowPageContextInterface>({
  stage: 0,
  setStage: () => {},
  submenu: null as null,
  setSubmenu: () => {},
  borrowRequest: defaultBorrowRequest,
  setBorrowRequest: () => {},
  loanTerms: null as [],
  setLoanTerms: () => {},
  lendingApp: null as any,
  setLendingApp: () => {},
  borrowProcessState: null,
});

const BorrowPageContextProvider = ({ children }: ContextProps) => {
  const [stage, setStage] = useState(0);
  const [submenu, setSubmenu] = useState(null as null);
  const [borrowRequest, setBorrowRequest] = useState(defaultBorrowRequest);
  const [loanTerms, setLoanTerms] = useState(LoanTerms);
  const [lendingApp, setLendingApp] = useState(LendingApp);

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
        lendingApp,
        setLendingApp,
        borrowProcessState,
      }}
    >
      {children}
    </BorrowPageContext.Provider>
  );
};
export default BorrowPageContextProvider;
