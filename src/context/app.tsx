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

export interface AppContextState {
  plaidLoggedIn: PlaidInterface | null;
  userTransactions: Array<PlaidTransaction> | null;
  errorModal: ErrorModal;
}

export interface AppContextInterface {
  state: AppContextState;
  updateAppState: Function;
}

export const AppContextDefault = {
  state: {
    plaidLoggedIn: null as null,
    userTransactions: null as null,
    errorModal: {
      show: false,
      message: null,
      title: null,
    } as ErrorModal
  },
  updateAppState: () => {}
};

export const AppContext = React.createContext<AppContextInterface>(AppContextDefault);
