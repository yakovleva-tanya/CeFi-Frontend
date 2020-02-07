import * as React from "react";

interface ErrorModal {
  show: boolean;
  message: string | null;
  title: string | null;
}

export interface AppContextState {
  plaidLoggedIn: boolean;
  errorModal: ErrorModal;
}

interface AppContextInterface {
  state: AppContextState;
  updateAppState: Function;
}

export const AppContextDefault = {
  state: {
    plaidLoggedIn: false,
    errorModal: {
      show: false,
      message: null,
      title: null,
    } as ErrorModal
  },
  updateAppState: () => {}
};

export const AppContext = React.createContext<AppContextInterface>(AppContextDefault);
