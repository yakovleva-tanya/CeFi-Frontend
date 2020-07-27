import * as React from "react";
import Plaid, { PlaidTransaction } from './../models/Plaid';

interface ErrorModal {
  show: boolean;
  message: string | null;
  title: string | null;
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
  BlockNative
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

export interface AppContextState {
  plaid: PlaidState;
  fico: FicoState;
  errorModal: ErrorModal;
  web3State: Web3State;
  zeroCollateral: ZeroCollateralState;
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
    fico: {
      score: null as null,
    },
    web3State: {
      address: null as null,
      web3: null as null,
      type: null as null
    },
    zeroCollateral: {
      balance: null as null,
      borrowed: false,
      contracts: {
        zDai: null as null,
        lendingPool: null as null,
      }
    },
    myState: {
      someproperty: null as null,
    },
    plaid: {
      loggedIn: null as null,
      userTransactions: null as null,
      income: null as null
    } as PlaidState,
    errorModal: {
      show: false,
      message: null,
      title: null,
    } as ErrorModal
  },
  updateAppState: () => {}
};

export const AppContext = React.createContext<AppContextInterface>(AppContextDefault);
