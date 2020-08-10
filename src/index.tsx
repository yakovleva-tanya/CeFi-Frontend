import * as React from "react";
import * as ReactDOM from "react-dom";
import Helmet from "react-helmet";
import Routing from "./components/Routing";
import { AppContext, AppContextInterface } from './context/app';
import useAppContext from './hooks/AppContext';

import './index.d';
import './index.scss';

function App() {
  const [state, updateAppState] = useAppContext();
  return (
    <div>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href="assets/favicon.ico"
          sizes="16x16"
        />
      </Helmet>
      <AppContext.Provider
        value={{ state, updateAppState } as AppContextInterface}
      >
        <Routing />
      </AppContext.Provider>
    </div>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById("zero-collateral-cefi")
);
