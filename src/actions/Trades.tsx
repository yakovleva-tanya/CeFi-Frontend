import {
  CurrencyAmount,
  Pair,
  Token,
  Trade,
  ChainId,
  JSBI,
  Percent,
  WETH,
  TokenAmount,
} from "@uniswap/sdk";
import { allContractAddresses } from "../util/constants";
const { request } = require("graphql-request");

const tokens = allContractAddresses.mainnet.tokens;
export const DAI = new Token(ChainId.MAINNET, tokens.DAI, 18, "DAI", "DAI");
export const USDC = new Token(ChainId.MAINNET, tokens.USDC, 6, "USDC", "USDC");
export const USDT = new Token(ChainId.MAINNET, tokens.USDT, 6, "USDT", "USDT");
export const MKR = new Token(ChainId.MAINNET, tokens.MKR, 18, "MKR", "Maker");
export const SNX = new Token(ChainId.MAINNET, tokens.SNX, 18, "SNX", "SNX");
export const LINK = new Token(ChainId.MAINNET, tokens.LINK, 18, "LINK", "LINK");
export const YFI = new Token(ChainId.MAINNET, tokens.YFI, 18, "YFI", "YFI");
export const LEND = new Token(ChainId.MAINNET, tokens.LEND, 18, "LEND", "LEND");
export const wBTC = new Token(ChainId.MAINNET, tokens.wBTC, 8, "wBTC", "wBTC");

const WETH_ONLY = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [
    ...WETH_ONLY[ChainId.MAINNET],
    DAI,
    USDC,
    USDT,
    MKR,
    SNX,
    LINK,
    YFI,
    LEND,
    wBTC,
  ],
};

const tokenKeys: { [key: string]: Token } = {
  DAI: DAI,
  SNX: SNX,
  MKR: MKR,
  LINK: LINK,
  YFI: YFI,
  LEND: LEND,
  wBTC: wBTC,
  USDT: USDT,
  USDC: USDC,
};

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);

const getPairCombinations = async () => {
  const array = BASES_TO_CHECK_TRADES_AGAINST[ChainId.MAINNET];
  const results = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const sortedTokens = [array[i], array[j]].sort((a: Token, b: Token) =>
        a.address < b.address ? -1 : 1
      );
      const address = await Pair.getAddress(array[i], array[j]).toLowerCase();
      results.push({
        address,
        token0: sortedTokens[0],
        token1: sortedTokens[1],
      });
    }
  }
  return results;
};

const reservesQuery = async () => {
  const allPairIDs = await getPairCombinations();
  let query = "";
  allPairIDs.forEach((pair) => {
    query += `pair${pair.address}:pair(id:"${pair.address}") {
        reserve0
        reserve1}`;
  });
  query = `{${query}}`;
  return query;
};

const fetchReserves = async () => {
  const query = await reservesQuery();
  const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
  const data = await request(URL, query);
  return data;
};

const getPairs = async () => {
  const pairCombinations = await getPairCombinations();
  const reserves = await fetchReserves();
  const validPairs: Pair[] = [];
  pairCombinations.forEach((pair) => {
    const { address, token0, token1 } = pair;
    const pairReserves = reserves[`pair${address}`];
    if (!pairReserves) return;
    const { reserve0, reserve1 } = pairReserves;
    if (reserve0 * reserve1 === 0) return;
    const decimals0 = 10 ** token0.decimals;
    const decimals1 = 10 ** token1.decimals;
    const reserve0BigInt = BigInt(Math.round(reserve0 * decimals0));
    const reserve1BigInt = BigInt(Math.round(reserve1 * decimals1));

    const newPair = new Pair(
      new TokenAmount(token0, reserve0BigInt),
      new TokenAmount(token1, reserve1BigInt)
    );
    validPairs.push(newPair);
  });
  return validPairs;
};

export const getBestTradeExactIn = async (
  currencyIn: string,
  currencyOut: string,
  amountIn: number
) => {
  const pairs = await getPairs();
  const decimals = 10 ** tokenKeys[currencyIn].decimals;
  const bestTrade = await Trade.bestTradeExactIn(
    pairs,
    new TokenAmount(tokenKeys[currencyIn], BigInt(amountIn * decimals)),
    tokenKeys[currencyOut],
    { maxHops: 3 }
  );
  return bestTrade[0];
};
export const getBestTradeExactOut = async (
  currencyIn: string,
  currencyOut: string,
  amountOut: number
) => {
  const pairs = await getPairs();
  const decimals = 10 ** tokenKeys[currencyOut].decimals;
  const bestTrade = await Trade.bestTradeExactOut(
    pairs,
    tokenKeys[currencyIn],
    new TokenAmount(tokenKeys[currencyOut], BigInt(amountOut * decimals)),
    { maxHops: 3 }
  );
  return bestTrade[0];
};

const basisPointsToPercent = (num: number): Percent => {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
};
export const computeSlippageAdjustedAmounts = (trade: Trade | undefined) => {
  const pct = basisPointsToPercent(INITIAL_ALLOWED_SLIPPAGE);
  return trade.minimumAmountOut(pct).toSignificant(4);
};
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000));
const BASE_FEE = new Percent(JSBI.BigInt(30), JSBI.BigInt(10000));
const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE);

// computes price breakdown for the trade
export const computeTradePriceBreakdown = (trade?: Trade) => {
  // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
  // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
  const realizedLPFee = !trade
    ? undefined
    : ONE_HUNDRED_PERCENT.subtract(
        trade.route.pairs.reduce(
          (currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE),
          ONE_HUNDRED_PERCENT
        )
      );

  // remove lp fees from price impact
  const priceImpactWithoutFeeFraction =
    trade && realizedLPFee
      ? trade.priceImpact.subtract(realizedLPFee)
      : undefined;

  // the x*y=k impact
  const priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
    ? new Percent(
        priceImpactWithoutFeeFraction?.numerator,
        priceImpactWithoutFeeFraction?.denominator
      )
    : undefined;

  // the amount of the input that accrues to LPs
  const realizedLPFeeAmount =
    realizedLPFee &&
    trade &&
    (trade.inputAmount instanceof TokenAmount
      ? new TokenAmount(
          trade.inputAmount.token,
          realizedLPFee.multiply(trade.inputAmount.raw).quotient
        )
      : CurrencyAmount.ether(
          realizedLPFee.multiply(trade.inputAmount.raw).quotient
        ));

  return {
    priceImpactWithoutFee: priceImpactWithoutFeePercent,
    realizedLPFee: realizedLPFeeAmount,
  };
};

export const getRoute = (trade: Trade) =>
  trade.route.path.map((token: Token) => token.symbol);

// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500),
  BIPS_BASE
); // 15%

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100),
  BIPS_BASE
); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300),
  BIPS_BASE
); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500),
  BIPS_BASE
); // 5%

export function formatExecutionPrice(
  trade?: Trade,
  inverted?: boolean
): string {
  if (!trade) {
    return "";
  }
  return inverted
    ? `${trade.executionPrice.invert().toSignificant(6)} ${
        trade.inputAmount.currency.symbol
      } / ${trade.outputAmount.currency.symbol}`
    : `${trade.executionPrice.toSignificant(6)} ${
        trade.outputAmount.currency.symbol
      } / ${trade.inputAmount.currency.symbol}`;
}
export default function FormattedPriceImpact({
  priceImpact,
}: {
  priceImpact?: Percent;
}) {
  return priceImpact
    ? priceImpact.lessThan(ONE_BIPS)
      ? "<0.01%"
      : `${priceImpact.toFixed(2)}%`
    : "-";
}
export function warningSeverity(
  priceImpact: Percent | undefined
): 0 | 1 | 2 | 3 | 4 {
  if (!priceImpact?.lessThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)) return 4;
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) return 3;
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_MEDIUM)) return 2;
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_LOW)) return 1;
  return 0;
}
