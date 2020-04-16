/**
 * Provides the signInContracts action.
 *
 * Instantiates web3 contracts and adds them to the application state.
 */

import * as React from "react";
import { Web3State, ZeroCollateralState } from './../context/app';

import ZDaiInterface = require('./../abi/ZDaiInterface.json');
import DaiPoolInterface = require('./../abi/DaiPoolInterface.json');
import LoansInterface = require('./../abi/LoansInterface.json');
import LenderInterface = require('./../abi/LenderInfoInterface.json');
import { globalDecimals, contractOptions } from "./../util/constants";

/**
 * Updates the Web3 state with Web3 contracts using the given updateAppState function.
 *
 * @function signInContracts
 * @memberof AppContextHook
 * @param {web3State}
 * @param {AppStateUpdater}
 */
export default async (web3State: Web3State, zeroCollateral: ZeroCollateralState): Promise<ZeroCollateralState> => {
  if (!web3State.web3) return zeroCollateral;

  const primaryAccount = web3State.address;
  const zDai = new web3State.web3.eth.Contract(
    ZDaiInterface.abi,
    contractOptions.zDai,
    {}
  );

  const daiPool = new web3State.web3.eth.Contract(
    DaiPoolInterface.abi,
    contractOptions.daiPool,
    {}
  );

  const lending = new web3State.web3.eth.Contract(
    LenderInterface.abi,
    contractOptions.lending,
    {}
  );

  const loans = new web3State.web3.eth.Contract(
    LoansInterface.abi,
    contractOptions.loans,
    {}
  );

  const contracts = { loans, lending, zDai, daiPool };
  const balanceStr = await zDai.methods.balanceOf(primaryAccount).call();
  const balance = parseFloat(balanceStr) / globalDecimals;

  return {
    ...zeroCollateral,
    contracts,
    balance
  };
}
