import * as React from "react";
import * as ReactDOM from "react-dom";

import Routing from "./components/Routing";
import { AppContext, AppContextInterface } from './context/app';
import useAppContext from './hooks/AppContext';

import './index.d';
import './index.scss';

function App() {
  const [state, updateAppState] = useAppContext();
  return (
    <AppContext.Provider value={{state, updateAppState} as AppContextInterface}>
      <Routing />
    </AppContext.Provider>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById("zero-collateral-cefi")
);
