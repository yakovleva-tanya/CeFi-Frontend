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

import zeroCollateralABI from './../abi/zerocollateral';
import fakeDaiABI from './../abi/fakedai';
import { globalDecimals } from "./../util/constants";

/**
 * Updates plaid transactions using the plaid loggedIn authentication credentials on PlaidModel.getTransactions.
 * @function updatePlaidTransactions
 * @memberof AppContextHook
 * @param {AppContextState}
 * @param {AppStateUpdater}
 */
const updatePlaidTransactions = async (state: AppContextState, updateAppState: Function) => {
  if (!state.plaid?.loggedIn) return;
  const response: Array<Either<PlaidTransaction, Error>> = await Plaid.getTransactions(state.plaid?.loggedIn.publicKey);

  updateAppState((st: AppContextState) => {
    const plaid = st.plaid;
    plaid.userTransactions = response.map(e => e.get(() => null)).filter(e => e);
    return { ...st, plaid };
  });

};

/**
 * Updates user income using the plaid loggedIn authentication credentials on PlaidModel.getTransactions.
 * @function updatePlaidIncome
 * @memberof AppContextHook
 * @param {AppContextState}
 * @param {AppStateUpdater}
 */
const updatePlaidIncome = async (state: AppContextState, updateAppState: Function) => {
  if (!state.plaid?.loggedIn) return;
  const response = await Plaid.getIncome(state.plaid?.loggedIn.publicKey);
  updateAppState((st: AppContextState) => {
    const plaid = st.plaid;
    plaid.income = response;
    return { ...st, plaid };
  });

};

const signInContracts = async (state: AppContextState, updateAppState: Function) => {
  if (!state.web3State.web3) return;
  const address = state.zeroCollateral.address;
  const daiAddress = state.zeroCollateral.daiAddress;
  const primaryAccount = state.web3State.address;
  const contract = new state.web3State.web3.eth.Contract(zeroCollateralABI, address, {});
  const daiContract = new state.web3State.web3.eth.Contract(fakeDaiABI, daiAddress, {});
  const balanceStr = await contract.methods.balanceOf(primaryAccount).call();
  const balance = parseFloat(balanceStr) / globalDecimals;
  updateAppState((st: AppContextState) => {
    const zeroCollateral = {
      ...st.zeroCollateral,
      daiContract,
      contract,
      balance
    };
    return { ...st, zeroCollateral };
  });
}

/**
 * Implements the app context hook.
 * @function useAppContext
 * @memberof AppContextHook
 */
export default function useAppContext()  {
  const [state, updateAppState] = React.useState(AppContextDefault.state);

  React.useEffect(() => {
    updatePlaidTransactions(state, updateAppState);
  }, [state.plaid?.loggedIn]);

  React.useEffect(() => {
    updatePlaidIncome(state, updateAppState);
  }, [state.plaid?.loggedIn]);

  React.useEffect(() => {
    signInContracts(state, updateAppState);
  }, [state.web3State?.web3]);

  return [state, updateAppState];
}
