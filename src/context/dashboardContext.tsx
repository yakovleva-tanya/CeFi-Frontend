import React, { createContext, useState } from "react";
import {
  PageTypes,
  DashboardContextInterface,
  ContextProps,
  LoanInterface,
  NavigationInterface,
  LendClaimStateInterface,
  LendWithdrawStateInterface,
  BorrowRepayStateInterface,
  BorrowDepositStateInterface,
  BorrowWithdrawStateInterface,
  UseCompoundStateInterface,
  UniswapStateInterface,
} from "./types";
import { AvailableLendingTokens } from "./app";

const navigationMap: NavigationInterface = {
  DEPOSIT: { Redeem: "Lend-Redeem", Withdraw: "Lend-Withdraw" },
  BORROW: {
    Repay: "Borrow-Repay",
    Deposit: "Borrow-Deposit",
    Withdraw: "Borrow-Withdraw",
  },
  SPEND: { Compound: "Spend-Compound", Uniswap: "Spend-Uniswap" },
};

const defaultDashboardContext: DashboardContextInterface = {
  onPage: PageTypes["Lend-Redeem"],
  setOnPage: () => {},
  navigationMap: navigationMap,
  setLoans: () => {},
  loans: null,
};
export const DashboardContext = createContext<DashboardContextInterface>(
  defaultDashboardContext
);

const DashboardContextProvider = ({ children }: ContextProps) => {
  const [onPage, setOnPage] = useState<PageTypes>(PageTypes["Lend-Redeem"]);
  const [loans, setLoans] = useState<Array<LoanInterface>>(null);

  return (
    <DashboardContext.Provider
      value={{
        onPage,
        setOnPage,
        navigationMap,
        loans,
        setLoans,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;

//LEND-CLAIM
const defaultLendClaimState: LendClaimStateInterface = {
  success: null as null,
  setSuccess: () => {},
  isCollecting: null as null,
  setCollecting: () => {},
  assetChangeWarning: null as null,
  setAssetChangeWarning: () => {},
  isClaiming: null as null,
  setClaiming: () => {},
  assetClaimed: null as null,
  setAssetClaimed: () => {},
};
export const LendClaimContext = React.createContext(defaultLendClaimState);
export const LendClaimContextProvider = ({ children }: ContextProps) => {
  const [success, setSuccess] = useState<LendClaimStateInterface["success"]>(
    defaultLendClaimState.success
  );
  const [isCollecting, setCollecting] = useState<
    LendClaimStateInterface["isCollecting"]
  >(null);
  const [assetChangeWarning, setAssetChangeWarning] = useState<
    LendClaimStateInterface["assetChangeWarning"]
  >(null);
  const [isClaiming, setClaiming] = useState<
    LendClaimStateInterface["isClaiming"]
  >(null);
  const [assetClaimed, setAssetClaimed] = useState<
    LendClaimStateInterface["assetClaimed"]
  >(null);

  const state = {
    success,
    setSuccess,
    isCollecting,
    setCollecting,
    assetChangeWarning,
    setAssetChangeWarning,
    isClaiming,
    setClaiming,
    assetClaimed,
    setAssetClaimed,
  };
  return (
    <LendClaimContext.Provider value={state}>
      {children}
    </LendClaimContext.Provider>
  );
};

// LEND-WITHDRAW
const defaultLendWithdrawState: LendWithdrawStateInterface = {
  selectedCurrency: null,
  setSelectedCurrency: () => {},
  isWithdrawing: false,
  setWithdrawing: () => {},
  success: false,
  setSuccess: () => {},
  warningMessage: "",
  setWarningMessage: () => {},
};
export const LendWithdrawContext = React.createContext(
  defaultLendWithdrawState
);
export const LendWithdrawContextProvider = ({ children }: ContextProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<
    AvailableLendingTokens
  >(AvailableLendingTokens.DAI);
  const [isWithdrawing, setWithdrawing] = useState<
    LendWithdrawStateInterface["isWithdrawing"]
  >(false);
  const [success, setSuccess] = useState<LendWithdrawStateInterface["success"]>(
    false
  );
  const [warningMessage, setWarningMessage] = useState<
    LendWithdrawStateInterface["warningMessage"]
  >("");

  const state = {
    selectedCurrency,
    setSelectedCurrency,
    isWithdrawing,
    setWithdrawing,
    success,
    setSuccess,
    warningMessage,
    setWarningMessage,
  };

  return (
    <LendWithdrawContext.Provider value={state}>
      {children}
    </LendWithdrawContext.Provider>
  );
};

//BORROW-REPAY
const defaultBorrowRepayState: BorrowRepayStateInterface = {
  selectedLoan: null as null,
  setSelectedLoan: () => {},
  isRepaying: false,
  setRepaying: () => {},
  repaySuccess: false,
  setRepaySuccess: () => {},
};

export const BorrowRepayContext = React.createContext(defaultBorrowRepayState);
export const BorrowRepayContextProvider = ({ children }: ContextProps) => {
  const [selectedLoan, setSelectedLoan] = useState<LoanInterface | null>(null);
  const [isRepaying, setRepaying] = useState<
    BorrowRepayStateInterface["isRepaying"]
  >(false);
  const [repaySuccess, setRepaySuccess] = useState<boolean>(false);

  const state = {
    selectedLoan,
    setSelectedLoan,
    isRepaying,
    setRepaying,
    repaySuccess,
    setRepaySuccess,
  };

  return (
    <BorrowRepayContext.Provider value={state}>
      {children}
    </BorrowRepayContext.Provider>
  );
};

//BORROW-DEPOSIT
const defaultBorrowDepositState: BorrowDepositStateInterface = {
  success: false,
  setSuccess: () => {},
  isDepositing: false,
  setDepositing: () => {},
  selectedLoan: null as null,
  setSelectedLoan: () => {},
  addCollateralSubmenu: null as null,
  setAddCollateralSubmenu: () => {},
  collateral: null as null,
  setCollateral: () => {},
  newCollateralPercent: null as null,
  setNewCollateralPercent: () => {},
};
export const BorrowDepositContext = React.createContext(
  defaultBorrowDepositState
);
export const BorrowDepositContextProvider = ({ children }: ContextProps) => {
  const [success, setSuccess] = useState<
    BorrowDepositStateInterface["success"]
  >(false);
  const [isDepositing, setDepositing] = useState<
    BorrowDepositStateInterface["isDepositing"]
  >(false);
  const [selectedLoan, setSelectedLoan] = useState<
    BorrowDepositStateInterface["selectedLoan"]
  >(null);
  const [addCollateralSubmenu, setAddCollateralSubmenu] = useState<
    BorrowDepositStateInterface["addCollateralSubmenu"]
  >(false);
  const [collateral, setCollateral] = useState<
    BorrowDepositStateInterface["collateral"]
  >(selectedLoan ? selectedLoan.totalCollateralDepositsAmount : 0);
  const [newCollateralPercent, setNewCollateralPercent] = useState<
    BorrowDepositStateInterface["newCollateralPercent"]
  >(null);

  const state = {
    success,
    setSuccess,
    isDepositing,
    setDepositing,
    selectedLoan,
    setSelectedLoan,
    addCollateralSubmenu,
    setAddCollateralSubmenu,
    collateral,
    setCollateral,
    newCollateralPercent,
    setNewCollateralPercent,
  };
  return (
    <BorrowDepositContext.Provider value={state}>
      {children}
    </BorrowDepositContext.Provider>
  );
};

//BORROW-WITHDRAW
const defaultBorrowWithdrawState: BorrowWithdrawStateInterface = {
  success: false,
  setSuccess: () => {},
  isWithdrawing: false,
  setWithdrawing: () => {},
  selectedLoan: null as null,
  setSelectedLoan: () => {},
  withdrawCollateralSubmenu: false,
  setWithdrawCollateralSubmenu: () => {},
  withdrawAmount: 0,
  setWithdrawAmount: () => {},
  newCollateralPercent: null,
  setNewCollateralPercent: () => {},
};
export const BorrowWithdrawContext = React.createContext(
  defaultBorrowWithdrawState
);
export const BorrowWithdrawContextProvider = ({ children }: ContextProps) => {
  const [success, setSuccess] = useState<
    BorrowWithdrawStateInterface["success"]
  >(false);
  const [isWithdrawing, setWithdrawing] = useState<
    BorrowWithdrawStateInterface["isWithdrawing"]
  >(false);
  const [selectedLoan, setSelectedLoan] = useState<
    BorrowWithdrawStateInterface["selectedLoan"]
  >(null);
  const [withdrawCollateralSubmenu, setWithdrawCollateralSubmenu] = useState<
    BorrowWithdrawStateInterface["withdrawCollateralSubmenu"]
  >(false);
  const [withdrawAmount, setWithdrawAmount] = useState<
    BorrowWithdrawStateInterface["withdrawAmount"]
  >(0);
  const [newCollateralPercent, setNewCollateralPercent] = useState<
    BorrowDepositStateInterface["newCollateralPercent"]
  >(null);
  const state = {
    success,
    setSuccess,
    isWithdrawing,
    setWithdrawing,
    selectedLoan,
    setSelectedLoan,
    withdrawCollateralSubmenu,
    setWithdrawCollateralSubmenu,
    withdrawAmount,
    setWithdrawAmount,
    newCollateralPercent,
    setNewCollateralPercent,
  };

  return (
    <BorrowWithdrawContext.Provider value={state}>
      {children}
    </BorrowWithdrawContext.Provider>
  );
};

//USE-COMPOUND
const defaultUseCompoundState: UseCompoundStateInterface = {
  success: false,
  setSuccess: () => {},
  isWithdrawing: false,
  setWithdrawing: () => {},
  isSupplying: false,
  setSupplying: () => {},
  selectedLoan: null as null,
  setSelectedLoan: () => {},
  amountSubmenu: false,
  setAmountSubmenu: () => {},
  amount: 0,
  setAmount: () => {},
  successMessage: "",
  setSuccessMessage: () => {},
};
export const UseCompoundContext = React.createContext(defaultUseCompoundState);
export const UseCompoundContextProvider = ({ children }: ContextProps) => {
  const [success, setSuccess] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [isSupplying, setSupplying] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amountSubmenu, setAmountSubmenu] = useState(false);
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const state = {
    success,
    setSuccess,
    isWithdrawing,
    setWithdrawing,
    isSupplying,
    setSupplying,
    selectedLoan,
    setSelectedLoan,
    amountSubmenu,
    setAmountSubmenu,
    amount,
    setAmount,
    successMessage,
    setSuccessMessage,
  };
  return (
    <UseCompoundContext.Provider value={state}>
      {children}
    </UseCompoundContext.Provider>
  );
};

//USE-UNISWAP

const defaultUniswapState: UniswapStateInterface = {
  selectedLoan: null as null,
  setSelectedLoan: () => {},
  success: false,
  setSuccess: () => {},
  values: null,
  setValues: () => {},
  swapExchangeRate: null,
  setSwapExchangeRate: () => {},
  options: null,
  tokenSelectionDropdown: null,
  setTokenSelectionDropdown: () => {},
};
export const UniswapContext = React.createContext(defaultUniswapState);
export const UniswapContextProvider = ({ children }: ContextProps) => {
  const options = [
    "DAI",
    "SNX",
    "MKR",
    "LINK",
    "YFI",
    "LEND",
    "ETH",
    "wBTC",
    "USDT",
    "USDC",
  ];
  const [selectedLoan, setSelectedLoan] = useState<null | LoanInterface>(null);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    first: {
      amount: "0.00",
      currency: options[0],
    },
    second: null,
  });
  const [swapExchangeRate, setSwapExchangeRate] = useState(false);
  const [tokenSelectionDropdown, setTokenSelectionDropdown] = useState(null);

  const state = {
    selectedLoan,
    setSelectedLoan,
    success,
    setSuccess,
    values,
    setValues,
    swapExchangeRate,
    setSwapExchangeRate,
    options,
    tokenSelectionDropdown,
    setTokenSelectionDropdown,
  };
  return (
    <UniswapContext.Provider value={state}>{children}</UniswapContext.Provider>
  );
};
