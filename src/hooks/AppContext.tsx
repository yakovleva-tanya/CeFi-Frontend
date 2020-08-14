/**
 * Provides an app context hook for general application data.
 *
 * This context is a custom hook that exposes useState and it's effectful updater.
 * @namespace AppContextHook
 * @category ReactHooks
 */

import * as React from "react";
import { AppContextDefault, AppContextState } from './../context/app';

import Either from './../util/Either';
import Plaid, { PlaidTransaction } from './../models/Plaid';
import { BlockNativeOptions } from './../util/constants';
import signInContracts from './../actions/signInContracts';

const setAddress = async (state: AppContextState, updateAppState: Function) => {
  const { web3State } = state;
  const accounts = await web3State.web3.eth.getAccounts();
  web3State.address = accounts[0];
  updateAppState((st: AppContextState) => {
    return { ...st, web3State }
  });
};

const setBlockNumber = async (state: AppContextState, updateAppState: Function) => {
  const { web3State } = state;
  const blockNumber = await web3State.web3.eth.getBlockNumber();
  web3State.blockNumber = blockNumber;
  updateAppState((st: AppContextState) => {
    return { ...st, web3State };
  });
};

const mergeSignInContracts = async (state: AppContextState, updateAppState: Function) => {
  const networkId = await state.web3State.web3.eth.getChainId();
  if (networkId !== BlockNativeOptions.networkId) return;
  try {
    const zeroCollateral = await signInContracts(state.web3State, state.zeroCollateral);
    updateAppState((st: AppContextState) => ({
      ...st,
      zeroCollateral
    }));
  } catch (e) {
    updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message: "An error occurred connecting to Teller contracts. Please try again.",
        title: "Error"
      };
      return { ...st, errorModal };
    });
  }
};

/**
 * Implements the app context hook.
 * @function useAppContext
 * @memberof AppContextHook
 */
export default function useAppContext()  {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    if (!state.web3State.web3) return;
    mergeSignInContracts(state, updateAppState);
  }, [state.web3State?.web3]);

  React.useEffect(() => {
    if (!state.web3State?.web3) return;
    setAddress(state, updateAppState);
  }, [state.web3State?.web3]);

  React.useEffect(() => {
    if (!state.web3State.web3) return;
    if(!state.web3State.network) return;
    setBlockNumber(state, updateAppState);
  }, [state.web3State.network]);

  return [state, updateAppState];
}
