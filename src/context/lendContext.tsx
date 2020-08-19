import React, { createContext, useState } from "react";

export interface ExchangeRates {
  [key: string]: number;
}
export interface LendPageContextInterface {
  selectedCurrency: string;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
  supplyAPY: number;
  exchangeRates: ExchangeRates;
}

export const LendPageContext = createContext<LendPageContextInterface>({
  selectedCurrency: "",
  setSelectedCurrency: () => {},
  selectedAmount: 0.00,
  setSelectedAmount: () => {},
  tokensApproved: false,
  setTokensApproved: () => {},
  supplyAPY: 8.4,
  exchangeRates: {},
});

type LendPageContextProps = {
  children: React.ReactNode;
};

const LendPageContextProvider = ({ children }: LendPageContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState("DAI");
  const [selectedAmount, setSelectedAmount] = useState(0.00);
  const [tokensApproved, setTokensApproved] = useState(false);
  const supplyAPY = 8.4;
  const exchangeRates = {
    USDT: 0.998,
    DAI: 1.033,
    USDC: 1.001,
  };
  return (
    <LendPageContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        selectedAmount,
        setSelectedAmount,
        tokensApproved,
        setTokensApproved,
        supplyAPY,
        exchangeRates,
      }}
    >
      {children}
    </LendPageContext.Provider>
  );
};
export default LendPageContextProvider;
