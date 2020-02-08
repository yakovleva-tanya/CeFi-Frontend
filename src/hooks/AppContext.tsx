import * as React from "react";
import { AppContextDefault } from './../context/app';

export default function useAppContext()  {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    
  }, [state.plaidLoggedIn]);

  return [state, updateAppState];
}
