import { Trade, WETH } from "@uniswap/sdk";
import { computeSlippageAdjustedAmounts } from "../actions/Trades";

const swap = async (
  escrow: any,
  web3UniswapContract: any,
  uniswapAddress: string,
  trade: Trade
) => {
  try {
    const canonicalWeth = WETH;
    const routerAddress = "";
    const path = trade.route.path;
    // An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity.
    const sourceAmount = trade.inputAmount.raw;
    const minDestination = await computeSlippageAdjustedAmounts(trade);
    const data = web3UniswapContract.methods
      .swap(canonicalWeth, routerAddress, path, sourceAmount, minDestination)
      .encodeABI();
    const dappData = {
      location: uniswapAddress,
      data: data,
    };
    const result = await escrow.methods.callDapp(dappData);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default swap;
