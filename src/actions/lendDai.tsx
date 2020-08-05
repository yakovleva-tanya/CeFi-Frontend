import { AppContextState } from "./../context/app";
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

const completeSupply = (
  state: any,
  updateAppState: Function,
  setTransactionHash: Function
) => async (values: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const { lendingPool, zDai } = state.zeroCollateral.contracts;
  try {
    const { balance, transactionHash } = await supplyDai(
      amount,
      primaryAddress,
      lendingPool,
      zDai,
      state.web3State
    );
    setTransactionHash(transactionHash);
    updateAppState((st: AppContextState) => {
      const zeroCollateral = st.zeroCollateral;
      zeroCollateral.balance = balance;
      return { ...st, zeroCollateral };
    });
  } catch (error) {
    console.log(error);
    updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message:
          "An error occurred during the lending process. Please try again.",
        title: "Error",
      };
      return { ...st, errorModal };
    });
  }
};

export default completeSupply;
