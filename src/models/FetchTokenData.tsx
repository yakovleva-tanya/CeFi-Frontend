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
      if (token.id === "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9") {
        id = "USDT";
      }
      if (token.id === "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4") {
        id = "wBTC";
      }
      tokens[id] = {
        price: token.underlyingPriceUSD,
        supplyAPY: token.supplyRate,
      };
    });

    //TODO get real rates
    tokens.LINK = { price: "12.93", supplyAPY: "0" };
    tokens.SNX = { price: "5.04", supplyAPY: "0" };
    tokens.MKR = { price: "545.62", supplyAPY: "0" };
    tokens.YFI = { price: "24245", supplyAPY: "0" };
    tokens.LEND = { price: "24,245", supplyAPY: "0" };

    return tokens;
  } catch (err) {
    console.log(err);
  }
};
export default FetchTokenData;
