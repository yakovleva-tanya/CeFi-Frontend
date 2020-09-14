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
    tokenData: {
      DAI: { price: 1.03, supplyAPY: 3.3 },
      USDC: { price: 1.0, supplyAPY: 2.44 },
      LINK: { price: 13.016, supplyAPY: 2.44 },
      ETH: { price: 396.15, supplyAPY: 2.44 },
    },
    myState: {
      someproperty: null as null,
    },
    demoData: {
      walletBalances: {
        USDC: 2981.1,
        DAI: 3280.55,
        ETH: 12.04,
        LINK: 233.1,
        TLR: 0,
        COMP: 0,
      },
      APYs: { USDC: 211.12, DAI: 107.02, TLR: 12.87, COMP: 20.54 },
      loans: [
        {
          id: "1231",
          token: "DAI",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 17,
            collateralRatio: 0,
            maxLoanAmount: 100,
            duration: 1,
            expiryAt: 1600200720000,
          },
          startDate: 1600114320000,
          endDate: 1600200720000,
          amountBorrowed: 100,
          status: StatusTypes["Active"],
          totalRepaidAmount: 0,
          totalOwedAmount: 100.05,
          totalCollateralDepositsAmount: 0,
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Unsecured",
          compound: {
            supplied: 10,
            earned: 0,
          },
        },
        {
          id: "1242",
          token: "DAI",
          collateralToken: "LINK",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 11,
            collateralRatio: 70,
            maxLoanAmount: 893,
            duration: 6,
            expiryAt: 1600294320000,
          },
          startDate: 1599775920000,
          endDate: 1600294320000,
          amountBorrowed: 893,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 893,
          collateralDeposits: [{ amount: 39 }],
          totalCollateralDepositsAmount: 49,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Secured",
          compound: {
            supplied: 399,
            earned: 0,
          },
        },
        {
          id: "1253",
          token: "USDC",
          collateralToken: "LINK",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 34,
            duration: 31,
            expiryAt: 1602540720000,
          },
          startDate: 1599948720000,
          endDate: 1602540720000,
          amountBorrowed: 34,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 50,
          collateralDeposits: [{ amount: 4 }],
          totalCollateralDepositsAmount: 4,
          collateralWithdrawns: [],
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Secured",
          compound: {
            supplied: 0,
            earned: 0,
          },
        },
        {
          id: "1264",
          token: "DAI",
          collateralToken: "LINK",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 160,
            maxLoanAmount: 10,
            duration: 1,
            expiryAt: 1599948720000,
          },
          startDate: 1599862320000,
          endDate: 1599948720000,
          amountBorrowed: 10,
          status: StatusTypes["Active"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 10,
          collateralDeposits: [{ amount: 0.81 }],
          totalCollateralDepositsAmount: 2.04,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Secured",
          compound: {
            supplied: 0,
            earned: 0,
          },
        },
        {
          id: "1239",
          token: "DAI",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 10,
            duration: 1,
            expiryAt: 1599948720000,
          },
          startDate: 1599862320000,
          endDate: 1599948720000,
          amountBorrowed: 10,
          status: StatusTypes["Closed"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 10,
          collateralDeposits: [{ amount: 0.81 }],
          totalCollateralDepositsAmount: 0.81,
          collateralWithdrawns: [{ amount: 1 }],
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Secured",
          compound: {
            supplied: 0,
            earned: 0,
          },
        },
        {
          id: "4643",
          token: "DAI",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 200,
            duration: 1,
            expiryAt: 1599948720000,
          },
          startDate: 1599862320000,
          endDate: 1599948720000,
          amountBorrowed: 200,
          status: StatusTypes["Closed"],
          repayments: [{ amount: 1 }],
          totalRepaidAmount: 0,
          totalOwedAmount: 200,
          totalCollateralDepositsAmount: 0,
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Unsecured",
          compound: {
            supplied: 0,
            earned: 0,
          },
        },
        {
          id: "935",
          token: "USDC",
          collateralToken: "ETH",
          transactionHash: "0xxxxxxxxxxxxxxxxxxxxxxx",
          terms: {
            interestRate: 1,
            collateralRatio: 60,
            maxLoanAmount: 60,
            duration: 1,
            expiryAt: 1599948720000,
          },
          startDate: 1599862320000,
          endDate: 1599948720000,
          amountBorrowed: 60,
          status: StatusTypes["Closed"],
          totalRepaidAmount: 0,
          totalOwedAmount: 0,
          totalCollateralDepositsAmount: 0,
          totalCollateralWithdrawalsAmount: 0,
          loanType: "Unsecured",
          compound: {
            supplied: 0,
            earned: 0,
          },
        },
      ],
      deposits: { DAI: 4134.76, USDC: 790 },
    },
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
