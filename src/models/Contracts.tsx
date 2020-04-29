import Notify from "./Web3Notify";
import { globalDecimals } from "./../util/constants";
import ERC20 = require('./../abi/contracts/ERC20.json');

/**
 * Approves spending of dai for zeroCollateral contracts.
 */
export async function approveDai(lendingPool: any, web3State: any, primaryAddress: string, amount: number) {
  const lendingTokenAddress = await lendingPool.methods.lendingToken().call();
  const dai = new web3State.web3.eth.Contract(ERC20.abi, lendingTokenAddress, {});
  return new Promise((resolve, reject) => dai.methods
    .approve(
      lendingPool._address,
      (globalDecimals*amount).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

export function mintZDai(contract: any, primaryAddress: string, amount: number) {
  return new Promise((resolve, reject) => contract.methods.deposit(
      (globalDecimals*amount).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}
