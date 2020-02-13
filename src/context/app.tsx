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

export interface AppContextState {
  plaid: PlaidState;
  errorModal: ErrorModal;
}

export interface AppContextInterface {
  state: AppContextState;
  updateAppState: Function;
}

export const AppContextDefault = {
  state: {
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
