/**
 * Abstraction that will open the Plaid modal and after the login, will store the Plaid
 * public_token.
 *
 * @namespace ConnectPlaid
 * @category ReactActions
 */

import Plaid from "./../models/Plaid";
import {
  createPlaidLinkToken,
  getBankInfo,
  BankInfoInterface,
  CreateLinkTokenResponse,
} from "./../models/DataProviders";
import { AppContextState, BankInfoResponseInterface } from "./../context/app";

export default (
  updateAppState: Function,
  address: string | null,
  setLoading: Function
) => async () => {
  if (address === null) return;
  try {
    const plaidTokenResponse = (await createPlaidLinkToken(
      address
    )) as CreateLinkTokenResponse;
    const token = plaidTokenResponse.data?.linkToken as string;
    const plaidHandler = new Plaid({
      token,
      onLoad: (): any => null,
      onSuccess: async function (plaid_token: string, metadata: any) {
        try {
          const bankInfo = { publicTokens: [plaid_token] } as BankInfoInterface;
          const bankInfoResponse = await getBankInfo(bankInfo);
          if (bankInfoResponse.data?.error)
            throw new Error("Bank Info response failed.");
          const bankInfoData = bankInfoResponse.data as BankInfoResponseInterface;
          updateAppState((st: AppContextState) => {
            const plaid = st.plaid;
            const dataProviderResponse = st.dataProviderResponse;
            dataProviderResponse.bankInfo = bankInfoData;
            plaid.loggedIn = { publicKey: plaid_token, metadata };
            return { ...st, plaid, dataProviderResponse };
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
          updateAppState((st: AppContextState) => {
            const errorModal = {
              show: true,
              message:
                "An error occurred fetching Plaid data. Please try again.",
              title: "Error",
            };
            return { ...st, errorModal };
          });
        }
      },
      onExit: async function () {
        setLoading(false);
      },
      onEvent: (): any => null,
    });
    plaidHandler.load();
  } catch (err) {
    console.log(err);
  }
};
