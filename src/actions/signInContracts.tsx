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
  TellerTokens,
  BaseTokens,
} from "./../context/app";

import TDaiInterface = require("./../abi/contracts/TDAI.json");
import DaiPoolInterface = require("./../abi/DaiPoolInterface.json");
import LoansInterface = require("./../abi/contracts/LoansInterface.json");
import ERC20Interface = require("./../abi/contracts/ERC20.json");
import LenderInterface = require("./../abi/contracts/Lenders.json");
import LendingPoolInterface = require("./../abi/contracts/LendingPoolInterface.json");
import { globalDecimals, allContractAddresses } from "./../util/constants";

/**
 * Sets up ATM data for a given lendingPoolAddress.
 */
async function setupTellerContracts(
  web3State: Web3State,
  lendingPoolAddress: string,
  loansInstanceAddress: string,
  primaryAccount: string,
  collateralAddress: string,
  tTokenAddress: string
): Promise<ATMData> {
  const lendingPool = new web3State.web3.eth.Contract(
    LendingPoolInterface.abi,
    lendingPoolAddress,
    {}
  );

  const loansInstance = new web3State.web3.eth.Contract(
    LoansInterface.abi,
    loansInstanceAddress
  );

  const tToken = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    tTokenAddress,
    {}
  );

  const collateralTokenAddress = collateralAddress;
  const collateralToken = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    collateralAddress,
    {}
  );
  const suppliedBalanceStr = await tToken.methods
    .balanceOf(primaryAccount)
    .call();
  const suppliedBalance = parseFloat(suppliedBalanceStr) / globalDecimals;
  const collateralBalanceStr = await collateralToken.methods
    .balanceOf(primaryAccount)
    .call();
  const userCollateralBalance =
    parseFloat(collateralBalanceStr) / globalDecimals;

  const borrowedBalanceStr = await collateralToken.methods
    .balanceOf(primaryAccount)
    .call();
  const userBorrowedBalance = parseFloat(borrowedBalanceStr) / globalDecimals;

  return {
    lendingPool,
    lendingPoolAddress,
    loansInstance,
    loansInstanceAddress,
    tTokenAddress,
    tToken,
    collateralTokenAddress,
    collateralToken,
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

  const link = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.LINK,
    {}
  );
  const linkBalanceStr = await link.methods.balanceOf(primaryAccount).call();
  const LINK = parseFloat(linkBalanceStr) / globalDecimals;

  const ethBalanceStr = await web3State.web3.eth.getBalance(primaryAccount);

  const ETH = parseFloat(ethBalanceStr) / globalDecimals;
  console.log({ ETH });

  return {
    DAI,
    USDC,
    ETH,
    LINK,
    //TODO get other balances
    SNX: 10.1,
    MKR: 21.3,
    YFI: 4,
    LEND: 0.3,
    wBTC: 0.1,
    USDT: 100,
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
    const contractAddresses =
      network === "1"
        ? allContractAddresses.mainnet
        : allContractAddresses.ropsten;
    const ETH_DAI = await setupTellerContracts(
      web3State,
      contractAddresses.ETH_LendingPool_tDAI_Proxy,
      contractAddresses.ETH_Loans_tDAI_Proxy,
      primaryAccount,
      contractAddresses.tokens.DAI,
      contractAddresses.TDAI
    );

    const userWalletBalance = await getWalletBalance(
      web3State,
      primaryAccount,
      contractAddresses
    );

    const contracts = teller.contracts;
    contracts[BaseTokens.ETH][TellerTokens.tDAI] = ETH_DAI;

    return {
      ...teller,
      contracts,
      userWalletBalance,
    };
  } catch (err) {
    console.log(err);
  }
};
