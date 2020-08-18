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
  cToken: any | null; // Token used for lending
  cTokenAddress: string | null;
  userCollateralBalance: number | null;
}

export interface TellerContracts {
  daiETH: ATMData,
  usdcETH: ATMData,
  usdtETH: ATMData
}

export interface TellerState {
  contracts: TellerContracts;
}
export interface FicoState {
  score: number | null;
}
export interface AppContextState {
  plaid: PlaidState;
  fico: FicoState;
  errorModal: ErrorModal;
  loginModal: LoginModal;
  web3State: Web3State;
  teller: TellerState;
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
      onboard: null as null,
      network: null as null,
      blockNumber: null as null
    },
    teller: {
      contracts: {
        usdtETH: {
          lendingPool: null as null,
          lendingPoolAddress: null as null,
          tToken: null as null,
          tTokenAddress: null as null,
          userBorrowedBalance: null as null,
          cToken: null as null,
          cTokenAddress: null as null,
          userCollateralBalance: null as null,
        },
        usdcETH: {
          lendingPool: null as null,
          lendingPoolAddress: null as null,
          tToken: null as null,
          tTokenAddress: null as null,
          userBorrowedBalance: null as null,
          cToken: null as null,
          cTokenAddress: null as null,
          userCollateralBalance: null as null,
        },
        daiETH: {
          lendingPool: null as null,
          lendingPoolAddress: null as null,
          tToken: null as null,
          tTokenAddress: null as null,
          userBorrowedBalance: null as null,
          cToken: null as null,
          cTokenAddress: null as null,
          userCollateralBalance: null as null,
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
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
