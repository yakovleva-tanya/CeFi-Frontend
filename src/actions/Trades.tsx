// import {
//   Currency,
//   CurrencyAmount,
//   Pair,
//   Token,
//   Trade,
//   ChainId,
//   JSBI,
//   Percent,
//   Token,
//   WETH,
// } from "@uniswap/sdk";

// type ChainTokenList = {
//   readonly [chainId in ChainId]: Token[];
// };

// import { useMemo } from "react";

// export const DAI = new Token(
//   ChainId.MAINNET,
//   "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//   18,
//   "DAI",
//   "Dai Stablecoin"
// );
// export const USDC = new Token(
//   ChainId.MAINNET,
//   "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//   6,
//   "USDC",
//   "USD//C"
// );
// export const USDT = new Token(
//   ChainId.MAINNET,
//   "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   6,
//   "USDT",
//   "Tether USD"
// );
// export const COMP = new Token(
//   ChainId.MAINNET,
//   "0xc00e94Cb662C3520282E6f5717214004A7f26888",
//   18,
//   "COMP",
//   "Compound"
// );
// export const MKR = new Token(
//   ChainId.MAINNET,
//   "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
//   18,
//   "MKR",
//   "Maker"
// );

// const options = [
//   "DAI",
//   "SNX",
//   "MKR",
//   "LINK",
//   "YFI",
//   "LEND",
//   "ETH",
//   "wBTC",
//   "USDT",
//   "USDC",
// ];

// const WETH_ONLY: ChainTokenList = {
//   [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
//   [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
//   [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
// };

// // used to construct intermediary pairs for trading
// export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
//   ...WETH_ONLY,
//   [ChainId.MAINNET]: [
//     ...WETH_ONLY[ChainId.MAINNET],
//     DAI,
//     USDC,
//     USDT,
//     COMP,
//     MKR,
//   ],
// };

// function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): Pair[] {
//   const { chainId } = useActiveWeb3React();

//   const bases: Token[] = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];

//   const [tokenA, tokenB] = chainId
//     ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
//     : [undefined, undefined];

//   const basePairs: [Token, Token][] = useMemo(
//     () =>
//       flatMap(bases, (base): [Token, Token][] =>
//         bases.map((otherBase) => [base, otherBase])
//       ).filter(([t0, t1]) => t0.address !== t1.address),
//     [bases]
//   );

//   const allPairCombinations: [Token, Token][] = useMemo(
//     () =>
//       tokenA && tokenB
//         ? [
//             // the direct pair
//             [tokenA, tokenB],
//             // token A against all bases
//             ...bases.map((base): [Token, Token] => [tokenA, base]),
//             // token B against all bases
//             ...bases.map((base): [Token, Token] => [tokenB, base]),
//             // each base against all bases
//             ...basePairs,
//           ]
//             .filter((tokens): tokens is [Token, Token] =>
//               Boolean(tokens[0] && tokens[1])
//             )
//             .filter(([t0, t1]) => t0.address !== t1.address)
//             .filter(([tokenA, tokenB]) => {
//               if (!chainId) return true;
//               const customBases = CUSTOM_BASES[chainId];
//               if (!customBases) return true;

//               const customBasesA: Token[] | undefined =
//                 customBases[tokenA.address];
//               const customBasesB: Token[] | undefined =
//                 customBases[tokenB.address];

//               if (!customBasesA && !customBasesB) return true;

//               if (
//                 customBasesA &&
//                 !customBasesA.find((base) => tokenB.equals(base))
//               )
//                 return false;
//               if (
//                 customBasesB &&
//                 !customBasesB.find((base) => tokenA.equals(base))
//               )
//                 return false;

//               return true;
//             })
//         : [],
//     [tokenA, tokenB, bases, basePairs, chainId]
//   );

//   const allPairs = usePairs(allPairCombinations);

//   // only pass along valid pairs, non-duplicated pairs
//   return useMemo(
//     () =>
//       Object.values(
//         allPairs
//           // filter out invalid pairs
//           .filter((result): result is [PairState.EXISTS, Pair] =>
//             Boolean(result[0] === PairState.EXISTS && result[1])
//           )
//           // filter out duplicated pairs
//           .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
//             memo[curr.liquidityToken.address] =
//               memo[curr.liquidityToken.address] ?? curr;
//             return memo;
//           }, {})
//       ),
//     [allPairs]
//   );
// }

// /**
//  * Returns the best trade for the exact amount of tokens in to the given token out
//  */
// export function useTradeExactIn(
//   currencyAmountIn?: CurrencyAmount,
//   currencyOut?: Currency
// ): Trade | null {
//   const allowedPairs = useAllCommonPairs(
//     currencyAmountIn?.currency,
//     currencyOut
//   );
//   return useMemo(() => {
//     if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
//       return (
//         Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
//           maxHops: 3,
//           maxNumResults: 1,
//         })[0] ?? null
//       );
//     }
//     return null;
//   }, [allowedPairs, currencyAmountIn, currencyOut]);
// }

// /**
//  * Returns the best trade for the token in to the exact amount of token out
//  */
// export function useTradeExactOut(
//   currencyIn?: Currency,
//   currencyAmountOut?: CurrencyAmount
// ): Trade | null {
//   const allowedPairs = useAllCommonPairs(
//     currencyIn,
//     currencyAmountOut?.currency
//   );

//   return useMemo(() => {
//     if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
//       return (
//         Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
//           maxHops: 3,
//           maxNumResults: 1,
//         })[0] ?? null
//       );
//     }
//     return null;
//   }, [allowedPairs, currencyIn, currencyAmountOut]);
// }
