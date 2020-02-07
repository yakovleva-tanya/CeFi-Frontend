import * as React from "react";
import * as ReactDOM from "react-dom";

import { ZeroRouting } from "./components/ZeroRouting";
import { AppContext, AppContextDefault } from './context/app';

function App() {

  const [state, updateAppState] = React.useState(AppContextDefault.state);

  return (
    <AppContext.Provider value={{state, updateAppState}}>
      <ZeroRouting />
    </AppContext.Provider>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById("zero-collateral-cefi")
);
