import React, { createContext, useState } from "react";

interface RepayProcessInterface {
  isRepaying: boolean;
  setRepaying: Function;
  repaySuccess: boolean;
  selectedLoan: null | loansInterface;
  setSelectedLoan: Function;
  setRepaySuccess: Function;
}
export interface DashboardContextInterface {
  onPage: pageTypes;
  setOnPage: Function;
  navigationMap: navigationInterface;
  loans: null | Array<loansInterface>;
  repayProcessState: null | RepayProcessInterface;
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

interface loansInterface {
  interestRate: number;
  loanSize: number;
  lendWith: string;
  loanTerm: number;
  loanType: string;
  liquidation: number;
  collateralWith: string;
  collateralAmount: number;
  collateralPercent: number;
  due: number;
  amountOwed: number;
  id: string;
  status?: string;
  percentFromLiquidation: number,
}
const default_loans: Array<loansInterface> = [
  {
    interestRate: 50,
    loanSize: 109,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1599951940049,
    amountOwed: 10,
    id: "1243",
    percentFromLiquidation: 1,
  },
  {
    interestRate: 50,
    loanSize: 150,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1598159140049,
    amountOwed: 0,
    id: "2343",
    percentFromLiquidation: -2,
  },
  {
    interestRate: 50,
    loanSize: 1140,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1598553990049,
    amountOwed: 100,
    id: "4643",
    percentFromLiquidation: 240,
  },
  {
    interestRate: 50,
    loanSize: 20,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    status: "outstanding",
    due: 1598252890049,
    amountOwed: 10,
    id: "473",
    percentFromLiquidation: 20,
  },
  {
    interestRate: 20,
    loanSize: 10,
    lendWith: "DAI",
    loanTerm: 5,
    loanType: "Fixed",
    liquidation: 90,
    collateralWith: "ETH",
    collateralAmount: 130,
    collateralPercent: 250,
    status: "outstanding",
    due: 1598252990049,
    amountOwed: 0,
    id: "876",
    percentFromLiquidation: -10,
  },
];

export const DashboardContext = createContext<DashboardContextInterface>({
  onPage: pageTypes["Lend-Claim"],
  setOnPage: () => {},
  navigationMap: navigationMap,
  loans: default_loans,
  repayProcessState: null,
});

const DashboardContextProvider = ({ children }: DashboardContextProps) => {
  const [onPage, setOnPage] = useState<pageTypes>(pageTypes["Lend-Claim"]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isRepaying, setRepaying] = useState(false);
  const [repaySuccess, setRepaySuccess] = useState(false);

  const currentTime = Date.now();

  const loans = default_loans.map((loan) => {
    if (loan.amountOwed === 0) {
      loan.status = "Repaid";
    } else if (currentTime > loan.due) {
      loan.status = "Overdue";
    } else {
      loan.status = "Outstanding";
    }
    return loan;
  });

  const repayProcessState: RepayProcessInterface = {
    isRepaying,
    setRepaying,
    repaySuccess,
    setRepaySuccess,
    selectedLoan,
    setSelectedLoan,
  };

  return (
    <DashboardContext.Provider
      value={{
        onPage,
        setOnPage,
        navigationMap,
        loans,
        repayProcessState,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
