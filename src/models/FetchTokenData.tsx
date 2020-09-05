import { TokenDataInterface } from "../context/types";
const { request } = require("graphql-request");
const compound_url = `https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2`;

const marketsQuery = `
{
  markets {
    supplyRate
    symbol
    underlyingPriceUSD
    id
  }
}
`;

const FetchTokenData = async () => {
  try {
    const { markets } = await request(compound_url, marketsQuery);
    const tokens: TokenDataInterface = {};
    markets.forEach((token: any) => {
      let id = token.symbol;
      if (token.id === "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643") {
        id = "DAI";
      }
      if (token.id === "0x39aa39c021dfbae8fac545936693ac917d5e7563") {
        id = "USDC";
      }
      if (token.id === "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5") {
        id = "ETH";
      }
      tokens[id] = {
        supplyAPY: token.supplyRate,
        price: token.underlyingPriceUSD,
      };
    });
    tokens.LINK = { price: "12", supplyAPY: "0" }; // TODO get link
    return tokens;
  } catch (err) {
    console.log(err);
  }
};
export default FetchTokenData;
