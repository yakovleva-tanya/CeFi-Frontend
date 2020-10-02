//USE-UNISWAP

import React, { useState, useEffect } from "react";
import { ContextProps, LoanInterface, UniswapStateInterface } from "./types";
import { getBestTradeExactIn, getBestTradeExactOut } from "../actions/Trades";

const defaultUniswapState: UniswapStateInterface = {
  selectedLoan: null,
  setSelectedLoan: () => {},
  success: null,
  setSuccess: () => {},
  trade: null,
  setTrade: () => {},
  options: null,
  tokenSelectionDropdown: null,
  setTokenSelectionDropdown: () => {},
  isExactIn: null,
  setIsExactIn: () => {},
  swapValues: null,
  setSwapValues: () => {},
  values: null,
  setValues: () => {},
};
export const UniswapContext = React.createContext(defaultUniswapState);

export const UniswapContextProvider = ({ children }: ContextProps) => {
  const options = [
    "DAI",
    "SNX",
    "MKR",
    "LINK",
    "YFI",
    "LEND",
    "wBTC",
    "USDT",
    "USDC",
  ];

  const defaultSwapValues = {
    selectedAmount: 0,
    tokenIn: "",
    tokenOut: "",
  };
  const defaultValues = {
    input: { amount: 0, token: "USDC" },
    output: { amount: 0, token: "" },
  };

  const [selectedLoan, setSelectedLoan] = useState<null | LoanInterface>(null);
  const [success, setSuccess] = useState(false);
  const [tokenSelectionDropdown, setTokenSelectionDropdown] = useState(null);
  const [trade, setTrade] = useState(null);
  const [isExactIn, setIsExactIn] = useState(true);
  const [swapValues, setSwapValues] = useState(defaultSwapValues);
  const [values, setValues] = useState(defaultValues);
  const { input, output } = values;

  useEffect(() => {
    const selectedAmount = isExactIn ? input.amount : output.amount;
    const tokenIn = isExactIn ? input.token : output.token;
    const tokenOut = isExactIn ? output.token : input.token;
    setSwapValues({ selectedAmount, tokenIn, tokenOut });
  }, [values, isExactIn]);

  useEffect(() => {
    if (
      !swapValues.tokenIn ||
      !swapValues.tokenOut ||
      !swapValues.selectedAmount
    )
      return;
    const getTrade = async () => {
      let trade = null;
      if (isExactIn) {
        trade = await getBestTradeExactIn(
          swapValues.tokenIn,
          swapValues.tokenOut,
          swapValues.selectedAmount
        );
      } else {
        trade = await getBestTradeExactOut(
          swapValues.tokenIn,
          swapValues.tokenOut,
          swapValues.selectedAmount
        );
      }
      setTrade(trade);
    };
    getTrade();
  }, [swapValues]);

  const uniswapState = {
    selectedLoan,
    setSelectedLoan,
    success,
    setSuccess,
    trade,
    setTrade,
    options,
    tokenSelectionDropdown,
    setTokenSelectionDropdown,
    isExactIn,
    setIsExactIn,
    swapValues,
    setValues,
    setSwapValues,
    values,
  };

  return (
    <UniswapContext.Provider value={uniswapState}>
      {children}
    </UniswapContext.Provider>
  );
};
