/** Imports */
import { useContext } from "react";
import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens
} from "../context/app";
import {
  DashboardContext,
  BorrowRepayContext,
} from "../context/dashboardContext";
import { loanRepayment, depositCollateral, withdrawCollateral } from "../models/LoansInterfaceContract";

/** Declarations */
const { state, updateAppState } = useContext(AppContext);
const { web3State } = state;
const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
  TellerTokens.tDAI
];
const borrower = state.web3State.address;

/** Methods */
export const repayLoan = async (id: string, totalOwedAmount: number) => {
  const response = await loanRepayment(
    loansInstance,
    Number(id),
    totalOwedAmount.toString(),
    borrower
  );
  console.log(response);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("repaid ", id);
  return true;
};

export const loanDeposit = async (id: string, amountToDeposit: number) => {
  const response = await depositCollateral(
    loansInstance,
    borrower,
    Number(id),
    amountToDeposit.toString(),
    web3State
  );
  console.log(response);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("deposited ");
  return true;
};

export const loanWithdraw = async (id: string, amountToWithdraw: number) => {
  const response = await withdrawCollateral(
    loansInstance,
    Number(id),
    amountToWithdraw.toString(),
    borrower
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("withdrawn ");
  return true;
};


export default { repayLoan, loanDeposit, loanWithdraw };