/**
 * Abstraction that will open the Plaid modal and after the login, will store the Plaid
 * public_token.
 *
 * @namespace ConnectPlaid
 * @category ReactActions
 */

import Plaid from './../models/Plaid';
import { AppContextState } from "./../context/app";

export default (updateAppState: Function) => () => {
  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: async function (public_token: string, metadata: any) {
      updateAppState((st: AppContextState) => {
        const plaid = st.plaid;
        plaid.loggedIn = { publicKey: public_token, metadata };
        return { ...st, plaid  };
      });
    },
    onExit: (): any => null,
    onEvent: (): any => null
  });

  plaidHandler.load();
};
