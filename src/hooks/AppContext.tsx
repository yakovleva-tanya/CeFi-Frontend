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

import ZDaiInterface = require('./../abi/ZDaiInterface.json');
import DaiPoolInterface = require('./../abi/DaiPoolInterface.json');
import LoansInterface = require('./../abi/LoansInterface.json');
import LenderInterface = require('./../abi/LenderInfoInterface.json');
import { globalDecimals, contractOptions } from "./../util/constants";

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
  const primaryAccount = state.web3State.address;

  const zDai = new state.web3State.web3.eth.Contract(
    ZDaiInterface,
    contractOptions.zDai,
    {}
  );

  const daiPool = new state.web3State.web3.eth.Contract(
    DaiPoolInterface,
    contractOptions.daiPool,
    {}
  );

  const lending = new state.web3State.web3.eth.Contract(
    LenderInterface,
    contractOptions.lending,
    {}
  );

  const loans = new state.web3State.web3.eth.Contract(
    LoansInterface,
    contractOptions.loans,
    {}
  );

  const contracts = { loans, lending, zDai, daiPool };

  const balance = 10;
  updateAppState((st: AppContextState) => {
    const zeroCollateral = {
      ...st.zeroCollateral,
      contracts,
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
