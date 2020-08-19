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
  tToken: any | null; // Token used for borrowing
  tTokenAddress: string | null;
  userBorrowedBalance: number | null;
  suppliedBalance: number | null;
  cToken: any | null; // Token used for lending
  cTokenAddress: string | null;
  userCollateralBalance: number | null;
}

export interface TellerContracts {
  [key: string]: ATMData;
}
export interface TellerContractsCat {
  [key: string]: TellerContracts;
}
export interface TellerState {
  contracts: TellerContractsCat;
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
          USDC: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            cToken: null as null,
            cTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
          DAI: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            cToken: null as null,
            cTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
        },
        LINK: {
          USDC: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            cToken: null as null,
            cTokenAddress: null as null,
            userCollateralBalance: null as null,
          },
          DAI: {
            lendingPool: null as null,
            lendingPoolAddress: null as null,
            tToken: null as null,
            tTokenAddress: null as null,
            userBorrowedBalance: null as null,
            suppliedBalance: null as null,
            cToken: null as null,
            cTokenAddress: null as null,
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
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
