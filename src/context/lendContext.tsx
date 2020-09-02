import React, { createContext, useState } from "react";
import {
  TellerTokens,
  AvailableLendingTokens,
  mapLendingTokensToTellerTokens,
} from "../context/app";
import { ContextProps } from "./types";

export interface LendPageContextInterface {
  selectedCurrency: AvailableLendingTokens;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
}

export const LendPageContext = createContext<LendPageContextInterface>({
  selectedCurrency: AvailableLendingTokens.DAI,
  setSelectedCurrency: () => {},
  selectedAmount: 0.0,
  setSelectedAmount: () => {},
  tokensApproved: false,
  setTokensApproved: () => {},
});

const LendPageContextProvider = ({ children }: ContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<
    AvailableLendingTokens
  >(AvailableLendingTokens.DAI);
  const [selectedAmount, setSelectedAmount] = useState(0.0);
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
