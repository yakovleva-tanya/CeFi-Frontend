import { Trade, WETH } from "@uniswap/sdk";
import { computeSlippageAdjustedAmounts } from "../actions/Trades";

const swap = async (
  escrowContract: any,
  web3UniswapContract: any,
  trade: Trade
) => {
  try {
    const path = trade.route.path;
    // An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity.
    const sourceAmount = trade.inputAmount.raw;
    const minDestination = await computeSlippageAdjustedAmounts(trade);

    const data = web3UniswapContract.methods
      .swap(path, sourceAmount, minDestination)
      .encodeABI();

    console.log({data});

    const dappData = {
      location: web3UniswapContract.address,
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
