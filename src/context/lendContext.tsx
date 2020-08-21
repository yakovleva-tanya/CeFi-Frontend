import React, { createContext, useState } from "react";
import {
  TellerTokens
} from "../context/app";

export interface ExchangeRates {
  [key: string]: number;
}
export interface LendPageContextInterface {
  selectedCurrency: AvailableTokens;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
}

export enum AvailableTokens {
  DAI = 'DAI',
  USDC = 'USDC'
}

export const LendPageContext = createContext<LendPageContextInterface>({
  selectedCurrency: AvailableTokens.DAI,
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
  const [selectedCurrency, setSelectedCurrency] = useState(AvailableTokens.DAI);
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
