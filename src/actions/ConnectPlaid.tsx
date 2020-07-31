/**
 * Abstraction that will open the Plaid modal and after the login, will store the Plaid
 * public_token.
 *
 * @namespace ConnectPlaid
 * @category ReactActions
 */

import Plaid from './../models/Plaid';
import { getBankInfo, BankInfoInterface } from './../models/DataProviders';
import { AppContextState, BankInfoResponseInterface } from "./../context/app";

export default (updateAppState: Function) => () => {
  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: async function (plaid_token: string, metadata: any) {
      const bankInfo = { publicTokens: [plaid_token] } as BankInfoInterface;
      const bankInfoResponse = await getBankInfo(bankInfo);
      const bankInfoData = bankInfoResponse.data as BankInfoResponseInterface;
      updateAppState((st: AppContextState) => {
        const plaid = st.plaid;
        const dataProviderResponse = st.dataProviderResponse;
        dataProviderResponse.bankInfo = bankInfoData;
        plaid.loggedIn = { publicKey: plaid_token, metadata };
        return { ...st, plaid, dataProviderResponse  };
      });
    },
    onExit: (): any => null,
    onEvent: (): any => null
  });

  plaidHandler.load();
};
