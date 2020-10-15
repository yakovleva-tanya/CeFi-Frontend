import { Trade, WETH } from "@uniswap/sdk";
import { computeSlippageAdjustedAmounts } from "../actions/Trades";
import { convertToBN } from "../models/LoansInterfaceContract";
const swap = async (
  escrowContract: any,
  web3UniswapContract: any,
  trade: Trade
) => {
  try {
    const path = trade.route.path.map((token) => {
      return token.address;
    });
    // An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity.
    console.log(
      trade.inputAmount.toSignificant(4),
      await computeSlippageAdjustedAmounts(trade)
    );

    const sourceAmount = convertToBN(trade.inputAmount.toSignificant(4));
    const minDestination = convertToBN(
      await computeSlippageAdjustedAmounts(trade)
    );
    console.log(minDestination, sourceAmount);
    console.log({ minDestination });
    const data = web3UniswapContract.methods
      .swap(path, sourceAmount, minDestination)
      .encodeABI();

    console.log({ data });
    console.log(web3UniswapContract);
    const dappData = {
      location: web3UniswapContract.methods.address,
      data: data,
    };
    console.log(dappData);
    const result = await escrowContract.methods.callDapp(dappData);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default swap;
