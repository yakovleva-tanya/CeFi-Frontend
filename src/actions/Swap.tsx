const swap = async (
  web3State: any,
  escrow: any,
  web3UniswapContract: any,
  uniswapAddress: string
) => {
  try {
    const canonicalWeth = ""; //address of the canonical WETH in the current network.
    const routerAddress = ""; //address of the Uniswap Router v02.
    const path = ""; // An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity.
    const sourceAmount = ""; // amount of source element (ETH or Tokens) to swap.
    const minDestination = ""; //The minimum amount of output tokens that must be received for the transaction not to revert.

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
