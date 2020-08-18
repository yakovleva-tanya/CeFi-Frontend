import React, { createContext, useState } from "react";

export interface LendPageContextInterface {
  selectedCurrency: string;
  setSelectedCurrency: Function;
  selectedAmount: number;
  setSelectedAmount: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
}

export const LendPageContext = createContext<LendPageContextInterface>({
  selectedCurrency: "",
  setSelectedCurrency: () => {},
  selectedAmount: 0.0,
  setSelectedAmount: () => {},
  tokensApproved: false,
  setTokensApproved: () => {},
});

type LendPageContextProps = {
  children: React.ReactNode;
};

const LendPageContextProvider = ({ children }: LendPageContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState("DAI");
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
