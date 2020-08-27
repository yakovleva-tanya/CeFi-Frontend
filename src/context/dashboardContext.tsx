import React, { createContext, useState } from "react";

export interface DashboardContextInterface {
  onPage: pageTypes;
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
export enum pageTypes {
  "Lend-Claim" = "Lend-Claim",
  "Lend-Withdraw" = "Lend-Withdraw",
  "Borrow-Repay" = "Borrow-Repay",
  "Borrow-Deposit" = "Borrow-Deposit",
  "Borrow-Withdraw" = "Borrow-Withdraw",
  "Use-Compound Finance" = "Use-Compound Finance",
  "Use-Uniswap" = "Use-Uniswap",
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
  onPage: pageTypes["Lend-Claim"],
  setOnPage: () => {},
  navigationMap: navigationMap,
});

const DashboardContextProvider = ({ children }: DashboardContextProps) => {
  const [onPage, setOnPage] = useState<pageTypes>(pageTypes["Lend-Claim"]);

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
