import * as React from "react";
import Plaid, { PlaidTransaction } from "./../models/Plaid";
import { AssetReport } from "plaid";
import { CollateralAdjustType } from "../components/CollateralAdjustModal";
import { StatusTypes } from "./types";

interface ErrorModal {
  show: boolean;
  message: string | null;
  title: string | null;
}

export interface BankInfoResponseInterface {
  assetReportStringified: string;
  assetReportSignature: string;
}

interface DataProviderResponseInterface {
  bankInfo: BankInfoResponseInterface | null;
}

interface LoginModal {
  show: boolean;
}

interface PlaidInterface {
  publicKey: string;
  metadata: any;
}

export interface PlaidState {
  loggedIn: PlaidInterface | null;
  userTransactions: Array<PlaidTransaction> | null;
  income: number | null;
}

export enum Web3Type {
  Fortmatic,
  Metamask,
  BlockNative,
}

export enum TellerTokens {
  tDAI = "tDAI",
  tUSDC = "tUSDC",
}

export enum BaseTokens {
  ETH = "ETH",
  LINK = "LINK",
}

export enum AvailableLendingTokens {
  DAI = "DAI",
  USDC = "USDC",
}

export const mapLendingTokensToTellerTokens = (
  x: AvailableLendingTokens
): TellerTokens => {
  if (x === AvailableLendingTokens.DAI) return TellerTokens.tDAI;
  if (x === AvailableLendingTokens.USDC) return TellerTokens.tUSDC;
};

export type TokenTypes = TellerTokens | BaseTokens;

export interface Web3State {
  web3: any;
  type: Web3Type | null;
  address: string | null;
  onboard: any | null;
  network: string | null;
  blockNumber: string | null;
}

/**
 * Data for User ATM information.
 */
export interface ATMData {
  lendingPool: any | null;
  lendingPoolAddress: any | null;
  tToken: any | null; // Our Token used for accruing lending
  tTokenAddress: string | null;
  collateralToken: any | null; // Token used for lending
  collateralTokenAddress: string | null;
  userBorrowedBalance: number | null;
  suppliedBalance: number | null;
  userCollateralBalance: number | null;
}

export type TellerContractsLendingATM = {
  [key in TellerTokens]: ATMData;
};

export type TellerContractsBorrowingATM = {
  [key in BaseTokens]: TellerContractsLendingATM;
};
export interface TellerState {
  contracts: TellerContractsBorrowingATM;
  userWalletBalance: null | UserWalletBalanceInterface;
}
export interface FicoState {
  score: number | null;
}
export interface TokenDataInterface {
  [key: string]: string;
}
export interface UserWalletBalanceInterface {
  [key: string]: number | null;
}
export interface AppContextState {
  plaid: PlaidState;
  fico: FicoState;
  errorModal: ErrorModal;
  loginModal: LoginModal;
  web3State: Web3State;
  teller: TellerState;
  dataProviderResponse: DataProviderResponseInterface;
  tokenData: any;
  demoData: any;
}

export interface AppContextInterface {
  state: AppContextState;
  updateAppState: Function;
}

/**
 * Initial state that will be loaded when the application starts.
 */
export const AppContextDefault = {
  state: {
    dataProviderResponse: {
      bankInfo: null as null,
    },
    fico: {
      score: null as null,
    },
    web3State: {
      address: null as null,
      web3: null as null,
      type: null as null,
      onboard: null as null,
      network: null as null,
      blockNumber: null as null,
    },
    teller: {
      userWalletBalance: null as null,
      contracts: {
        ETH: {
          tUSDC: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            collateralToken: null as null,
            collateralTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
          tDAI: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            collateralToken: null as null,
            collateralTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
        },
        LINK: {
          tUSDC: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            collateralToken: null as null,
            collateralTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
          tDAI: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            collateralToken: null as null,
            collateralTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
        },
      },
    },
    plaid: {
      loggedIn: null as null,
      userTransactions: null as null,
      income: null as null,
    } as PlaidState,
    errorModal: {
      show: false,
      message: null,
      title: null,
    } as ErrorModal,
    loginModal: {
      show: false,
    } as LoginModal,
    tokenData: null as null,
    myState: {
      someproperty: null as null,
    },
    demoData: {
      walletBalances: { USDC: 120.23, DAI: 215.65, ETH: 1.42, LINK: 52 },
      APYs: { USDC: 211.12, DAI: 107.02, TLR: 12.87, COMP: 20.54 },
      loans: [
        {
          id: "1234",
          token: "DAI",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 500,
            duration: 1,
            expiryAt: 1598195687893,
          },
          startDate: 1598995687893,
          endDate: 1598195687893,
          amountBorrowed: 500,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 500,
          collateralDeposits: [{ amount: 0.71 }],
          totalCollateralDepositsAmount: 0.71,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
        },
        {
          id: "1244",
          token: "USDC",
          collateralToken: "LINK",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 70,
            maxLoanAmount: 150,
            duration: 1,
            expiryAt: 1598195687893,
          },
          startDate: 1598995687893,
          endDate: 1598195687893,
          amountBorrowed: 5000,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 650,
          collateralDeposits: [{ amount: 40 }],
          totalCollateralDepositsAmount: 40,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
        },
        {
          id: "1254",
          token: "USDC",
          collateralToken: "LINK",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 50,
            duration: 1,
            expiryAt: 1598995687893,
          },
          startDate: 1598995687893,
          endDate: 1598995687893,
          amountBorrowed: 5000,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 50,
          collateralDeposits: [{ amount: 4 }],
          totalCollateralDepositsAmount: 4,
          collateralWithdrawns: [],
          totalCollateralWithdrawalsAmount: 0,
        },
        {
          id: "1264",
          token: "DAI",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 50,
            duration: 1,
            expiryAt: 1598995687893,
          },
          startDate: 1598995687893,
          endDate: 1598995687893,
          amountBorrowed: 500,
          status: StatusTypes["Closed"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 500,
          collateralDeposits: [{ amount: 0.81 }],
          totalCollateralDepositsAmount: 0.81,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
        },
      ],
      deposits: { DAI: 325, USDC: 141 },
    },
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
