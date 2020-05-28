import * as React from "react";
import * as ReactDOM from "react-dom";

import { ZeroRouting } from "./components/ZeroRouting";
import { AppContext, AppContextInterface } from './context/app';
import useAppContext from './hooks/AppContext';

import './index.d';

function App() {
  const [state, updateAppState] = useAppContext();
  return (
    <AppContext.Provider value={{state, updateAppState} as AppContextInterface}>
      <ZeroRouting />
    </AppContext.Provider>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById("zero-collateral-cefi")
);
