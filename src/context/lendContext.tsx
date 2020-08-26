import React, { createContext, useState } from "react";
import {
  TellerTokens,
  AvailableLendingTokens,
  mapLendingTokensToTellerTokens
} from "../context/app";

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
  selectedAmount: 0.00,
  setSelectedAmount: () => {},
  tokensApproved: false,
  setTokensApproved: () => {},
});

type LendPageContextProps = {
  children: React.ReactNode;
};

const LendPageContextProvider = ({ children }: LendPageContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<AvailableLendingTokens>(AvailableLendingTokens.DAI);
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
