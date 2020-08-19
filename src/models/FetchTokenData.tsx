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
interface TokenInterface {
  supplyAPY: string;
  price: string;
}
interface TokenDataInterface {
  [key: string]: TokenInterface;
}
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
      if (token.id === "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9") {
        id = "USDT";
      }
      tokens[id] = {
        supplyAPY: token.supplyRate,
        price: token.underlyingPriceUSD,
      };
    });
    return tokens;
  } catch (err) {
    console.log(err);
  }
};
export default FetchTokenData;
