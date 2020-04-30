import { approveDai, mintZDai } from "./../models/Contracts";

import { globalDecimals } from "./../util/constants";

export default async (amount: number, primaryAddress: string, lendingPoolContract: any, zDaiContract: any, web3State: any): Promise<any> => {
  await approveDai(lendingPoolContract, web3State, primaryAddress, amount);
  await mintZDai(lendingPoolContract, primaryAddress, amount);
  const balance = await zDaiContract.methods.balanceOf(primaryAddress).call();
  return (parseFloat(balance) / globalDecimals);
}
