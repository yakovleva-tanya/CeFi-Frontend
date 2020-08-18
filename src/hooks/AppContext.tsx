/**
 * Provides an app context hook for general application data.
 *
 * This context is a custom hook that exposes useState and it's effectful updater.
 * @namespace AppContextHook
 * @category ReactHooks
 */

import * as React from "react";
import { AppContextDefault, AppContextState } from "./../context/app";

import Either from "./../util/Either";
import Plaid, { PlaidTransaction } from "./../models/Plaid";
import { BlockNativeOptions } from "./../util/constants";
import signInContracts from "./../actions/signInContracts";
import FetchTokenData from "../models/FetchTokenData";

const setAddress = async (state: AppContextState, updateAppState: Function) => {
  const { web3State } = state;
  const accounts = await web3State.web3.eth.getAccounts();
  web3State.address = accounts[0];
  updateAppState((st: AppContextState) => {
    return { ...st, web3State };
  });
};

const setBlockNumber = async (
  state: AppContextState,
  updateAppState: Function
) => {
  const { web3State } = state;
  if (web3State.network === "unknown") return;
  const blockNumber = await web3State.web3.eth.getBlockNumber();
  web3State.blockNumber = blockNumber;
  updateAppState((st: AppContextState) => {
    return { ...st, web3State };
  });
};

const mergeSignInContracts = async (
  state: AppContextState,
  updateAppState: Function
) => {
  const networkId = await state.web3State.web3.eth.getChainId();

  if (networkId !== BlockNativeOptions.networkId) {
    const zeroCollateral = AppContextDefault.state.zeroCollateral;
    updateAppState((st: AppContextState) => ({
      ...st,
      zeroCollateral,
    }));
  } else {
    try {
      const zeroCollateral = await signInContracts(
        state.web3State,
        state.zeroCollateral
      );
      updateAppState((st: AppContextState) => ({
        ...st,
        zeroCollateral,
      }));
    } catch (e) {
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred connecting to Teller contracts. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
    }
  }
};

const getTokenData = async (
  state: AppContextState,
  updateAppState: Function
) => {
  try {
    if (state.tokenData !== null) return;
    const tokenData = await FetchTokenData();
    updateAppState((st: AppContextState) => {
      return { ...st, tokenData };
    });
  } catch (err) {
    console.log(err);
  }
};
const setUpdates = async (state: AppContextState, updateAppState: Function) => {
  await setAddress(state, updateAppState);
  await mergeSignInContracts(state, updateAppState);
  await setBlockNumber(state, updateAppState);
};
/**
 * Implements the app context hook.
 * @function useAppContext
 * @memberof AppContextHook
 */
export default function useAppContext() {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    if (!state.web3State.network) return;
    setUpdates(state, updateAppState);
    getTokenData(state, updateAppState);
  }, [state.web3State?.network]);

  React.useEffect(() => {
    getTokenData(state, updateAppState);
  }, []);

  return [state, updateAppState];
}
