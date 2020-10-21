import {
  AppContext,
  AppContextState,
  AvailableLendingTokens,
  mapLendingTokensToTellerTokens,
  BaseTokens,
  TellerContractsBorrowingATM,
} from "../context/app";
import Notify from "./../models/Web3Notify";
import { globalDecimals } from './../util/constants';

import { allContractAddresses } from "../util/constants";

import { redeemTDai } from '../models/Contracts';


export const claimInterest = async (currency: string) => {
  //TODO Send Claim Interest transaction
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("claimed ", currency);
  return true;
};

export const collectInterest = async (currency: string) => {
  //TODO Send collect Interest transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("collected ", currency);
  return true;
};

export interface WithdrawRequest {
  selectedCurrency: AvailableLendingTokens;
  selectedAmount: string;
  primaryAddress: string;
  updateAppState: Function;
  contracts: TellerContractsBorrowingATM;
}

/**
 * Withdraw the given amount from the selected ATM. Currently only supports the ETH
 * pools. After, update the remaining balance.
 *
 * @param currency Selected Lending token to withdraw.
 * @param amount Amount of token to withdraw from the pool.
 * @param primaryAddress Address of the user to withdraw to.
 * @param updateAppState State updating function.
 */
export const withdraw = async ({
  selectedCurrency,
  selectedAmount,
  primaryAddress,
  updateAppState,
  contracts
}: WithdrawRequest) => {
  const baseTokens = BaseTokens.ETH; // Currently constant.
  const tellerTokens = mapLendingTokensToTellerTokens(selectedCurrency);
  const { lendingPool, tToken } = contracts[baseTokens][tellerTokens];
  const bnAmount = (parseFloat(selectedAmount) * globalDecimals).toLocaleString('fullwide', { useGrouping:false });
  await new Promise((resolve, reject) => tToken.methods
    .approve(lendingPool._address, bnAmount)
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
  await redeemTDai(selectedAmount, primaryAddress, lendingPool);
  const balanceSt = await tToken.methods.balanceOf(primaryAddress).call();
  const decimals = await tToken.methods.decimals().call();
  const balance = parseFloat(balanceSt) / parseFloat(decimals);
  console.log('suppliedBalance updated')
  updateAppState((st: AppContextState) => {
    const teller = st.teller;
    teller.contracts[baseTokens][tellerTokens].suppliedBalance = balance;
    return { ...st, teller };
  });
};

export default { claimInterest, collectInterest, withdraw };
