import { redeemZDai } from "./../models/Contracts";

export default async (primaryAddress: string, lendingPoolContract: any, zDaiContract: any): Promise<any> => {
  const balance = await zDaiContract.methods.balanceOf(primaryAddress).call();
  await redeemZDai(balance, primaryAddress, lendingPoolContract);
  return zDaiContract.methods.balanceOf(primaryAddress).call();
}
