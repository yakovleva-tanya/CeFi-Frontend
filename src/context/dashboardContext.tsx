import React, { createContext, useState } from "react";

export interface DashboardContextInterface {
  onPage: string;
  setOnPage: Function;
  navigationMap: navigationInterface;
}
type DashboardContextProps = {
  children: React.ReactNode;
};

export interface navigationInterface {
  [key: string]: subNavInterface;
}
export interface subNavInterface {
  [key: string]: string;
}

const navigationMap: navigationInterface = {
  LEND: { Claim: "Lend-Claim", Withdraw: "Lend-Withdraw" },
  BORROW: {
    Repay: "Borrow-Repay",
    Deposit: "Borrow-Deposit",
    Withdraw: "Borrow-Withdraw",
  },
  USE: { "Compound Finance": "Use-Compound Finance", Uniswap: "Use-Uniswap" },
};

export const DashboardContext = createContext<DashboardContextInterface>({
  onPage: "Lend-Claim",
  setOnPage: () => {},
  navigationMap: navigationMap,
});

const DashboardContextProvider = ({ children }: DashboardContextProps) => {
  const [onPage, setOnPage] = useState("Lend-Withdraw");

  return (
    <DashboardContext.Provider
      value={{
        onPage,
        setOnPage,
        navigationMap,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
