import React, { createContext, useState } from "react";
import {
  TellerTokens
} from "../context/app";

export interface ExchangeRates {
  [key: string]: number;
}
export interface LendPageContextInterface {
  selectedCurrency: TellerTokens;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
}

export const LendPageContext = createContext<LendPageContextInterface>({
  selectedCurrency: TellerTokens.tDAI,
  setSelectedCurrency: () => {},
  selectedAmount: 0.00,
  setSelectedAmount: () => {},
  tokensApproved: false,
  setTokensApproved: () => {},
});

type LendPageContextProps = {
  children: React.ReactNode;
};

const LendPageContextProvider = ({ children }: LendPageContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(TellerTokens.tDAI);
  const [selectedAmount, setSelectedAmount] = useState(0.00);
  const [tokensApproved, setTokensApproved] = useState(false);

  return (
    <LendPageContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        selectedAmount,
        setSelectedAmount,
        tokensApproved,
        setTokensApproved,
      }}
    >
      {children}
    </LendPageContext.Provider>
  );
};
export default LendPageContextProvider;
