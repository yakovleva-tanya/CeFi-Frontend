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

export interface ZeroCollateralContracts {
  zDai: any | null;
  lendingPool: any | null;
  dai: any | null;
}

export interface ZeroCollateralState {
  contracts: ZeroCollateralContracts;
  balance: number | null;
  daiBalance: number | null;
  borrowed: boolean;
}
export interface FicoState {
  score: number | null;
}
export interface TokenDataInterface {
  [key: string]: string;
}
export interface AppContextState {
  plaid: PlaidState;
  fico: FicoState;
  errorModal: ErrorModal;
  loginModal: LoginModal;
  web3State: Web3State;
  zeroCollateral: ZeroCollateralState;
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
      blockNumber: null as null
    },
    zeroCollateral: {
      balance: null as null,
      borrowed: false,
      daiBalance: null as null,
      contracts: {
        zDai: null as null,
        lendingPool: null as null,
        dai: null as null,
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
    tokenData: null as null,
  },
  updateAppState: () => {},
};

export const AppContext = React.createContext<AppContextInterface>(
  AppContextDefault
);
