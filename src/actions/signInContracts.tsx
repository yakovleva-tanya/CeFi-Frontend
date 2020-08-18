/**
 * Provides the signInContracts action.
 *
 * Instantiates web3 contracts and adds them to the application state.
 */

import * as React from "react";
import { Web3State, TellerState, ATMData } from "./../context/app";

import ZDaiInterface = require("./../abi/contracts/ZDai.json");
import DaiPoolInterface = require("./../abi/DaiPoolInterface.json");
import LoansInterface = require("./../abi/contracts/Loans.json");
import ERC20Interface = require("./../abi/contracts/ERC20.json");
import LenderInterface = require("./../abi/contracts/Lenders.json");
import LendingPoolInterface = require("./../abi/contracts/LendingPool.json");
import { globalDecimals, contractAddresses } from "./../util/constants";

async function setupTellerContracts(
  web3State: Web3State,
  lendingPoolAddress: string,
  primaryAccount: string
): Promise<ATMData> {

  const lendingPool = new web3State.web3.eth.Contract(
    LendingPoolInterface.abi,
    lendingPoolAddress,
    {}
  );

  const tTokenAddress = await lendingPool.methods.tToken().call();
  const tToken = new web3State.web3.eth.Contract(
    ZDaiInterface.abi,
    tTokenAddress,
    {}
  );

  const cTokenAddress = await lendingPool.methods.cToken().call();
  const cToken = new web3State.web3.eth.Contract(
    ZDaiInterface.abi,
    cTokenAddress,
    {}
  );
  const collateralBalanceStr = await cToken.methods.balanceOf(primaryAccount).call();
  const userCollateralBalance = parseFloat(collateralBalanceStr) / globalDecimals;

  const borrowedBalanceStr = await cToken.methods.balanceOf(primaryAccount).call();
  const userBorrowedBalance = parseFloat(borrowedBalanceStr) / globalDecimals;

  return {
    lendingPool,
    lendingPoolAddress,
    tTokenAddress,
    tToken,
    cTokenAddress,
    cToken,
    userCollateralBalance,
    userBorrowedBalance,
  };

}

/**
 * Updates the Web3 state with Web3 contracts using the given updateAppState function.
 *
 * @function signInContracts
 * @memberof AppContextHook
 * @param {web3State}
 * @param {TellerState}
 */
export default async (
  web3State: Web3State,
  teller: TellerState
): Promise<TellerState> => {
  try {
    if (!web3State.web3) return teller;

    const {
      ETH_LendingPool_tDAI,
      ETH_LendingPool_tUSDC,
    } = contractAddresses;

    const primaryAccount = web3State.address;

    const daiETH = await setupTellerContracts(
      web3State,
      ETH_LendingPool_tDAI,
      primaryAccount,
    );

    const usdcETH = await setupTellerContracts(
      web3State,
      ETH_LendingPool_tUSDC,
      primaryAccount,
    );

    const contracts = {
      daiETH,
      usdcETH,
      usdtETH: {
        lendingPool: null as null,
        lendingPoolAddress: null as null,
        tToken: null as null,
        tTokenAddress: null as null,
        userBorrowedBalance: null as null,
        cToken: null as null,
        cTokenAddress: null as null,
        userCollateralBalance: null as null,
      },
    };
    return {
      ...teller,
      contracts,
    };
  } catch (err) {
    console.log(err);
  }
};
