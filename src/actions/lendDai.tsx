import { mintZDai } from "./../models/Contracts";
import { globalDecimals } from "./../util/constants";

const supplyDai = async (
  amount: number,
  primaryAddress: string,
  lendingPoolContract: any,
  zDaiContract: any,
  web3State: any
): Promise<any> => {
  const mint: any = await mintZDai(
    lendingPoolContract,
    web3State,
    primaryAddress,
    amount
  );
  const balance = await zDaiContract.methods.balanceOf(primaryAddress).call();
  const result = {
    balance: parseFloat(balance) / globalDecimals,
    transactionHash: mint.transactionHash,
  };
  return result;
};

export default supplyDai;
