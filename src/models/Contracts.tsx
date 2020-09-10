import Notify from "./Web3Notify";
import ERC20 = require('./../abi/contracts/ERC20Detailed.json');
import { Web3State } from './../context/app';
import { globalDecimals } from './../util/constants';

async function getLendingToken(lendingPool: any, web3State: Web3State) {
  const lendingTokenAddress = await lendingPool.methods.lendingToken().call();
  return new web3State.web3.eth.Contract(ERC20.abi, lendingTokenAddress, {});
}

/**
 * Redeeem Teller tokens from specified lending Pool.
 */
export async function redeemZDai(amount: string, primaryAddress: string, lendingPool: any) {
  const bnAmount = (parseFloat(amount) * globalDecimals).toLocaleString('fullwide', { useGrouping:false });
  return new Promise((resolve, reject) => lendingPool.methods
    .withdraw(bnAmount)
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

/**
 * Approves 10x spending of dai for zeroCollateral contracts.
 */
export async function getLendingPoolDecimals(lendingPool: any, web3State: Web3State) {
  const dai = await getLendingToken(lendingPool, web3State);
  const decimals = await dai.methods.decimals().call();
  return 10**parseFloat(decimals);
}

/**
 * Approves 10x spending of dai for zeroCollateral contracts.
 */
export async function approveDai(lendingPool: any, web3State: Web3State, primaryAddress: string, amount: number) {
  const dai = await getLendingToken(lendingPool, web3State);
  const tokenDecimals = await getLendingPoolDecimals(lendingPool, web3State);
  const allowance = await dai.methods.allowance(primaryAddress, lendingPool._address).call();
  const approved = (amount*tokenDecimals) < parseFloat(allowance);
  if (approved) return;
  return new Promise((resolve, reject) => dai.methods
    .approve(
      lendingPool._address,
      (10*amount*tokenDecimals).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

export async function mintZDai( setProcessing: any, contract: any, web3State: Web3State, primaryAddress: string, amount: number) {
  const dai = await getLendingToken(contract, web3State);
  const decimals = await dai.methods.decimals().call();
  const tokenDecimals = 10**parseFloat(decimals);
  const onTransactionHash = (e: any) => {
    setProcessing(e);
    Notify.hash(e);
  };
  return new Promise((resolve, reject) => contract.methods.deposit(
      (tokenDecimals*amount).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', onTransactionHash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}
