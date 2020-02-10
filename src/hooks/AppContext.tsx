import * as React from "react";
import { AppContextDefault, AppContextState } from './../context/app';
import Either from './../util/Either';

import Plaid, { PlaidTransaction } from './../models/Plaid';

const updatePlaidTransactions = async (state: AppContextState, updateAppState: Function) => {
  if (!state.plaidLoggedIn) return;
  const response: Array<Either<PlaidTransaction, Error>> = await Plaid.getTransactions(state.plaidLoggedIn.publicKey);

  updateAppState((st: AppContextState) => {
    const userTransactions = response.map(e => e.get(() => null)).filter(e => e);
    st.userTransactions = userTransactions;
    return { ...st, userTransactions };
  });

};

export default function useAppContext()  {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    updatePlaidTransactions(state, updateAppState);
  }, [state.plaidLoggedIn]);

  return [state, updateAppState];
}
