import * as React from "react";
import Plaid, { PlaidTransaction } from "./../models/Plaid";
import { AssetReport } from "plaid";
import { CollateralAdjustType } from "../components/CollateralAdjustModal";

interface ErrorModal {
  show: boolean;
  message: string | null;
  title: string | null;
}

export interface BankInfoResponseInterface {
  assetReport: AssetReport;
  signature: string;
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

export interface Web3State {
  web3: any;
  type: Web3Type | null;
  address: string | null;
}

export interface ZeroCollateralContracts {
  zDai: any | null;
  lendingPool: any | null;
}

export interface ZeroCollateralState {
  contracts: ZeroCollateralContracts;
  balance: number | null;
  borrowed: boolean;
}

export interface FicoState {
  score: number | null;
}

export interface LendPageState {
  selectedCurrency: string;
  selectedAmount: number;
  tokensApproved: boolean;
  supplyAPY: number;
}
export interface LoanRequestValues {
  selectedCurrency: string;
  loanSize: number;
  loanTerm: number;
  collateralWith: string;
  collateralPercent: number;
  loanType: string;
  bankConnected: boolean;
}
export interface LoanTerms {
  interestRate: number;
  minCollateralNeeded: number;
  loanSize: number;
}
export interface BorrowPageState {
  stage: number;
  requestValues: LoanRequestValues;
  loanTerms: LoanTerms;
}
export interface ExchangeRates {
  [key: string]: number;
}
export interface AppContextState {
  plaid: PlaidState;
  fico: FicoState;
  errorModal: ErrorModal;
  loginModal: LoginModal;
  web3State: Web3State;
  zeroCollateral: ZeroCollateralState;
  dataProviderResponse: DataProviderResponseInterface;
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
    },
    zeroCollateral: {
      balance: null as null,
      borrowed: false,
      contracts: {
        zDai: null as null,
        lendingPool: null as null,
      },
    },
    myState: {
      someproperty: null as null,
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
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
