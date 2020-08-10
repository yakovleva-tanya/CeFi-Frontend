import React, { createContext, useState } from "react";

interface BorrowRequest {
  loanSize: number;
  loanTerm: number;
  collateralWith: string;
  collateralPercent: number;
  loanType: string;
  bankConnected: boolean;
  lendWith: string;
  collateralAmount: number;
}
interface LoanTerms {
  interestRate: number;
  minCollateralNeeded: number;
}

interface BorrowPageContextInterface {
  stage: number;
  setStage: Function;
  submenu: React.ReactNode;
  setSubmenu: Function;
  borrowRequest: BorrowRequest;
  setBorrowRequest: Function;
  loanTerms: LoanTerms;
  setLoanTerms: Function;
}

const defaultBorrowRequest = {
  loanSize: 1,
  loanTerm: 5,
  collateralWith: "ETH",
  collateralPercent: 50,
  loanType: "Fixed",
  bankConnected: false,
  lendWith: "DAI",
  collateralAmount: 1
};
const mockLoanTerms = {
  interestRate: 20,
  minCollateralNeeded: 100,
};

export const BorrowPageContext = createContext<BorrowPageContextInterface>({
  stage: 1,
  setStage: () => {},
  submenu: null,
  setSubmenu: () => {},
  borrowRequest: defaultBorrowRequest,
  setBorrowRequest: () => {},
  loanTerms: mockLoanTerms,
  setLoanTerms: () => {},
});

type BorrowPageContextProps = {
  children: React.ReactNode;
};

const BorrowPageContextProvider = ({ children }: BorrowPageContextProps) => {
  const [stage, setStage] = useState(1);
  const [submenu, setSubmenu] = useState(null);
  const [borrowRequest, setBorrowRequest] = useState(defaultBorrowRequest);
  const [loanTerms, setLoanTerms] = useState(mockLoanTerms);

  return (
    <BorrowPageContext.Provider
      value={{
        stage,
        setStage,
        submenu,
        setSubmenu,
        borrowRequest,
        setBorrowRequest,
        loanTerms,
        setLoanTerms,
      }}
    >
      {children}
    </BorrowPageContext.Provider>
  );
};
export default BorrowPageContextProvider;
