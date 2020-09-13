/** Imports */
import { useContext } from "react";
import Web3 from "web3";
import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens,
  Web3State
} from "../context/app";
import {
  DashboardContext,
  BorrowRepayContext,
} from "../context/dashboardContext";
import { loanRepayment, depositCollateral, withdrawCollateral } from "../models/LoansInterfaceContract";

/** Methods */
export const repayLoan = async (
  loansInstance: any,
  id: string,
  totalOwedAmount: number,
  web3State: Web3State
) => {
  const borrower = web3State.address;
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

export const loanDeposit = async (
  loansInstance: any,
  id: string,
  amountToDeposit: number,
  web3State: Web3State
) => {
  const borrower = web3State.address;
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

export const loanWithdraw = async (
  loansInstance: any,
  id: string,
  amountToWithdraw: number,
  web3State: Web3State
) => {
  const borrower = web3State.address;
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