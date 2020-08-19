/**
 * Provides the signInContracts action.
 *
 * Instantiates web3 contracts and adds them to the application state.
 */

import * as React from "react";
import {
  Web3State,
  TellerState,
  ATMData,
  AppContextDefault,
} from "./../context/app";

import ZDaiInterface = require("./../abi/contracts/ZDai.json");
import DaiPoolInterface = require("./../abi/DaiPoolInterface.json");
import LoansInterface = require("./../abi/contracts/Loans.json");
import ERC20Interface = require("./../abi/contracts/ERC20.json");
import LenderInterface = require("./../abi/contracts/Lenders.json");
import LendingPoolInterface = require("./../abi/contracts/LendingPool.json");
import { globalDecimals, allContractAddresses } from "./../util/constants";

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
  const suppliedBalanceStr = await tToken.methods
    .balanceOf(primaryAccount)
    .call();
  const suppliedBalance = parseFloat(suppliedBalanceStr) / globalDecimals;
  const collateralBalanceStr = await cToken.methods
    .balanceOf(primaryAccount)
    .call();
  const userCollateralBalance =
    parseFloat(collateralBalanceStr) / globalDecimals;

  const borrowedBalanceStr = await cToken.methods
    .balanceOf(primaryAccount)
    .call();
  const userBorrowedBalance = parseFloat(borrowedBalanceStr) / globalDecimals;

  return {
    lendingPool,
    lendingPoolAddress,
    tTokenAddress,
    tToken,
    cTokenAddress,
    cToken,
    suppliedBalance,
    userCollateralBalance,
    userBorrowedBalance,
  };
}

async function getWalletBalance(
  web3State: Web3State,
  primaryAccount: string,
  contractAddress: any
): Promise<any> {
  const usdc = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.USDC,
    {}
  );
  const usdcBalanceStr = await usdc.methods.balanceOf(primaryAccount).call();
  const USDC = parseFloat(usdcBalanceStr) / globalDecimals;

  const dai = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.DAI,
    {}
  );
  const daiBalanceStr = await dai.methods.balanceOf(primaryAccount).call();
  const DAI = parseFloat(daiBalanceStr) / globalDecimals;

  return {
    DAI,
    USDC,
    USDT: null as null,
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
    const primaryAccount = web3State.address;
    const network = web3State.network.toString();
    const contractAddresses = network === "1" ? allContractAddresses.mainnet : allContractAddresses.ropsten;
    const daiProxy = contractAddresses.ETH_LendingPool_tDAI_Proxy;
    const DAI = await setupTellerContracts(
      web3State,
      daiProxy,
      primaryAccount
    );

    const userWalletBalance = await getWalletBalance(
      web3State,
      primaryAccount,
      contractAddresses
    );

    const contracts = {
      ETH: {
        ...teller.contracts.ETH,
        DAI,
      },
    };
    return {
      ...teller,
      contracts,
      userWalletBalance,
    };
  } catch (err) {
    console.log(err);
  }
};

