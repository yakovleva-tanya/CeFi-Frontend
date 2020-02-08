import * as React from "react";

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
  errorModal: ErrorModal;
}

export interface AppContextInterface {
  state: AppContextState;
  updateAppState: Function;
}

export const AppContextDefault = {
  state: {
    plaidLoggedIn: null as null,
    errorModal: {
      show: false,
      message: null,
      title: null,
    } as ErrorModal
  },
  updateAppState: () => {}
};

export const AppContext = React.createContext<AppContextInterface>(AppContextDefault);
