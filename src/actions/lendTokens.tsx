import {
  AppContextState,
  AvailableLendingTokens,
  mapLendingTokensToTellerTokens,
  BaseTokens,
} from "./../context/app";
import { mintTDai } from "./../models/Contracts";
import { globalDecimals } from "./../util/constants";

const supplyDai = async (
  setProcessing: any,
  amount: number,
  primaryAddress: string,
  lendingPoolContract: any,
  zDaiContract: any,
  web3State: any
): Promise<any> => {
  const mint: any = await mintTDai(
    setProcessing,
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

/**
 * Supplies new tokens to the ATM.
 */
const completeSupply = (
  state: any,
  updateAppState: Function,
  setTransactionHash: Function,
  setProcessing: Function,
  lendingTokens: AvailableLendingTokens,
  selectedAmount: number
) => async () => {
  if (process.env.INTEGRATIONS_DISABLED === "true") {
    setProcessing("true");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessing("");
    setTransactionHash("TransactionHash");
    return;
  }

  const amount = selectedAmount;
  const primaryAddress = state.web3State.address;
  const baseTokens = BaseTokens.ETH; // Currently constant.
  const tellerTokens = mapLendingTokensToTellerTokens(lendingTokens);
  const { lendingPool, tToken } = state.teller.contracts[baseTokens][
    tellerTokens
  ];

  try {
    const { balance, transactionHash } = await supplyDai(
      setProcessing,
      amount,
      primaryAddress,
      lendingPool,
      tToken,
      state.web3State
    );
    setProcessing("");
    setTransactionHash(transactionHash);
    updateAppState((st: AppContextState) => {
      const teller = st.teller;
      teller.contracts[baseTokens][tellerTokens].suppliedBalance = balance;
      return { ...st, teller };
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
