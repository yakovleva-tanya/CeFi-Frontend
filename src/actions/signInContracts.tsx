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
import UniswapInterface = require("./../abi/contracts/Uniswap.json");
import EscrowInterface = require("./../abi/contracts/Escrow.json");

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
  tTokenAddress: string,
  esscrowAddress: string,
  uniswapAddress: string
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

  const escrow = new web3State.web3.eth.Contract(
    EscrowInterface.abi,
    esscrowAddress,
    {}
  );
  const web3UniswapContract = new web3State.web3.eth.Contract(
    UniswapInterface.abi,
    uniswapAddress,
    {}
  );

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
    escrow,
    web3UniswapContract,
  };
}

async function getWalletBalance(
  web3State: Web3State,
  primaryAccount: string,
  contractAddress: any
): Promise<any> {
  //Get DAI balance
  const dai = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.DAI,
    {}
  );
  const daiBalanceStr = await dai.methods.balanceOf(primaryAccount).call();
  const DAI = parseFloat(daiBalanceStr) / globalDecimals;

  //Get USDC balance
  const usdc = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.USDC,
    {}
  );
  const usdcBalanceStr = await usdc.methods.balanceOf(primaryAccount).call();
  const USDC = parseFloat(usdcBalanceStr) / globalDecimals;

  //Get ETH balance
  const ethBalanceStr = await web3State.web3.eth.getBalance(primaryAccount);
  const ETH = parseFloat(ethBalanceStr) / globalDecimals;

  //Get LINK balance
  const link = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.LINK,
    {}
  );
  const linkBalanceStr = await link.methods.balanceOf(primaryAccount).call();
  const LINK = parseFloat(linkBalanceStr) / globalDecimals;

  //Get SNX balance
  const snx = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.SNX,
    {}
  );
  const snxBalanceStr = await snx.methods.balanceOf(primaryAccount).call();
  const SNX = parseFloat(snxBalanceStr) / globalDecimals;
  console.log({ SNX });

  //Get MKR balance
  const mkr = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.MKR,
    {}
  );
  const mkrBalanceStr = await mkr.methods.balanceOf(primaryAccount).call();
  const MKR = parseFloat(mkrBalanceStr) / globalDecimals;
  console.log({ MKR });

  //Get YFI balance
  const yfi = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.YFI,
    {}
  );
  const yfiBalanceStr = await yfi.methods.balanceOf(primaryAccount).call();
  const YFI = parseFloat(yfiBalanceStr) / globalDecimals;

  //Get LEND balance
  const lend = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.LEND,
    {}
  );
  const lendBalanceStr = await lend.methods.balanceOf(primaryAccount).call();
  const LEND = parseFloat(lendBalanceStr) / globalDecimals;

  //Get wBTC balance
  const wbtc = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.wBTC,
    {}
  );
  const wBTCBalanceStr = await wbtc.methods.balanceOf(primaryAccount).call();
  const wBTC = parseFloat(wBTCBalanceStr) / globalDecimals;

  //Get USDT balance
  const usdt = new web3State.web3.eth.Contract(
    ERC20Interface.abi,
    contractAddress.tokens.USDT,
    {}
  );
  const usdtBalanceStr = await usdt.methods.balanceOf(primaryAccount).call();
  const USDT = parseFloat(usdtBalanceStr) / globalDecimals;

  return {
    DAI,
    USDC,
    ETH,
    LINK,
    SNX,
    MKR,
    YFI,
    LEND,
    wBTC,
    USDT,
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
      contractAddresses.TDAI,
      contractAddresses.Escrow,
      contractAddresses.Uniswap
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
