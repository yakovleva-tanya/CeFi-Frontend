// const swap = async (
// ) => {
//   try {
//     const network = web3State.network.toString();
//     const address =
//       network === "1"
//         ? allContractAddresses.mainnet
//         : allContractAddresses.ropsten;

//     const data = web3UniswapContract.swapETHForExactTokens(amountOut, address, calldata_path, address_to, uint_deadline).encodeABI()

//     let dappData = {
//       location: address,
//       data: data
//     };
//     const result = await escrow.callDapp(dappData);
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default swap;
