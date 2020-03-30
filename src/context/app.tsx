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
  Metamask
}

export interface Web3State {
  web3: any;
  type: Web3Type | null;
  address: string | null;
}

export interface ZeroCollateralState {
  contract: any | null;
  daiContract: any | null;
  address: string;
  daiAddress: string;
  balance: number | null;
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
      address: "0x497f344243db7b5c3d825428a3c4991b04a6c469",
      contract: null as null,
      daiContract: null as null,
      daiAddress: "0x69cc1445e2737f980ea7ac32147db3b2c3136a5e",
      balance: null as null
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
