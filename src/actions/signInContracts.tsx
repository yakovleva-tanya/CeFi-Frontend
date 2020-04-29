/**
 * Provides the signInContracts action.
 *
 * Instantiates web3 contracts and adds them to the application state.
 */

import * as React from "react";
import { Web3State, ZeroCollateralState } from './../context/app';

import ZDaiInterface = require('./../abi/contracts/ZDai.json');
import DaiPoolInterface = require('./../abi/DaiPoolInterface.json');
import LoansInterface = require('./../abi/contracts/Loans.json');
import LenderInterface = require('./../abi/contracts/Lenders.json');
import LendingPoolInterface = require('./../abi/contracts/LendingPool.json');
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

  const lendingPool = new web3State.web3.eth.Contract(
    LendingPoolInterface.abi,
    contractOptions.lendingPool,
    {}
  );
  const zDaiAddress = await lendingPool.methods.zToken().call();

  const primaryAccount = web3State.address;
  const zDai = new web3State.web3.eth.Contract(
    ZDaiInterface.abi,
    zDaiAddress,
    {}
  );

  const contracts = { zDai, lendingPool };
  const balanceStr = await zDai.methods.balanceOf(primaryAccount).call();
  const balance = parseFloat(balanceStr) / globalDecimals;

  return {
    ...zeroCollateral,
    contracts,
    balance
  };
}
