import Notify from "./Web3Notify";
import ERC20 = require('./../abi/contracts/ERC20Detailed.json');
import { Web3State } from './../context/app';
import { globalDecimals } from './../util/constants';

import { BigNumber } from "@ethersproject/bignumber";
/**
 * Converts a given amount into a BN instance
 * @param {string} amount The amount to be converted
 */
export function convertToBN(
  amount: string
) {
  const result = (parseFloat(amount) * globalDecimals).toLocaleString('fullwide', { useGrouping: false });
  return result;
}

/**
 * Get the associated token contract
 * @param {*} loansInterface Teller protocol's loansInterface contract
 * @param {Web3State} web3State stored web3 state
 */
async function getCollateralToken(
  loansInterface: any,
  web3State: Web3State
) {
  const collateralTokenAddress = await loansInterface.methods.collateralToken().call();
  return new web3State.web3.eth.Contract(ERC20.abi, collateralTokenAddress, {});
}

/**
 * Approves tokens for a loansInterface
 * @param {*} loansInterface Teller protocol's loansInterface contract
 * @param {Web3State} web3State The stored web3 state
 * @param {string} spenderAddress The wallet address of the spender
 * @param {number} amountToApprove The amount to be approved
 */
export async function approveToken(
  loansInterface: any,
  web3State: Web3State,
  spenderAddress: string,
  amountToApprove: number
) {
  const collateralToken = await getCollateralToken(loansInterface, web3State);
  const decimals = await collateralToken.methods.decimals().call();
  const tokenDecimals = 10**parseFloat(decimals)
  const allowance = await collateralToken.methods.allowance(spenderAddress, loansInterface._address).call();
  if ((amountToApprove * tokenDecimals) < parseFloat(allowance)) {
    return
  } else {
    return new Promise((resolve, reject) => collateralToken.methods
      .approve(
        loansInterface._address,
        (10*amountToApprove*tokenDecimals).toLocaleString('fullwide', { useGrouping: false })
      )
      .send({ from: spenderAddress })
      .on('transactionHash', Notify.hash)
      .on('receipt', resolve)
      .on('error', reject)
    );
  }
}

/**
 * Creates/processes a loan with loan request and terms
 * @param {*} loanRequest The Teller protocol loan request
 * @param {*} loanResponses The list of the Teller protocol loan responses
 * @param {*} loansInterface Teller protocol's loansInterface contract
 * @param {string} collateralAmount The amount of collateral required for the loan
 * @param {string} borrowerAddress The wallet address of the borrower
 */
export async function createLoanWithTerms(
  loanRequest: any,
  loanResponses: any,
  loansInterface: any,
  collateralAmount: string,
  borrowerAddress: string
) {
  const bnAmount = convertToBN(collateralAmount);
  console.log("bnAmount: ", bnAmount);
  console.log("request: ", loanRequest);
  console.log("response: ", loanResponses);
  console.log("collateral: ", collateralAmount, ' |BN| ', bnAmount);
  console.log('borrower: ', borrowerAddress);
  return new Promise((resolve, reject) => loansInterface.methods
    .createLoanWithTerms(
      loanRequest,
      [loanResponses.loanResponse1, loanResponses.loanResponse2],
      bnAmount
    )
    .send({ from: borrowerAddress, value: bnAmount })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

/**
 * Deposits collateral into a created loan
 * @param {*} loansInterface Teller protocol's loansInterface contract
 * @param {string} borrowerAddress The address of the loan borrower
 * @param {number} loanId The ID of the loan the collateral is for
 * @param {string} amount The amount of collateral being deposited
 * @param {Web3State} web3State The stored web3 state
 */
export async function depositCollateral(
  loansInterface: any,
  borrowerAddress: string,
  loanId: number,
  amount: string,
  web3State: Web3State
) {
  const bnAmount = convertToBN(amount);
  const collateralToken = await getCollateralToken(loansInterface, web3State);
  // Check allowance of loansInterface
  const approvedAmount = await collateralToken.methods.allowance(borrowerAddress, loansInterface._address).call();
  if (bnAmount > approvedAmount) {
    return
  } else {
    return new Promise((resolve, reject) => loansInterface.methods
      .depositCollateral(
        borrowerAddress,
        loanId,
        bnAmount
      )
      .send({ from: borrowerAddress })
      .on('transactionHash', Notify.hash)
      .on('receipt', resolve)
      .on('error', reject)
    );
  }
}

/**
 * Takes out a loan from the Teller protocol
 * @param {*} loansInterface Teller protocol's loanInterface contract
 * @param {number} loanId The ID of the loan being taken out
 * @param {string} amountToBorrow The amount to be borrowed
 * @param {string} borrowerAddress The address of the loan borrower
 */
export async function takeOutLoan(
  loansInterface: any,
  loanId: number,
  amountToBorrow: string,
  borrowerAddress: string
) {
  const bnAmount = convertToBN(amountToBorrow);
  return new Promise((resolve, reject) => loansInterface.methods
    .takeOutLoan(
      loanId,
      bnAmount
    )
    .send({ from: borrowerAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

/**
 * Withdraws collateral from a loan
 * @param {*} loansInterface Teller protocol's loanInterface contract
 * @param {number} loanId The ID of the loan from which collateral is being withdrawn
 * @param {string} amountToWithdraw The amount of collateral to withdraw
 * @param {string} borrowerAddress The address of the loan borrower
 */
export async function withdrawCollateral(
  loansInterface: any,
  loanId: number,
  amountToWithdraw: string,
  borrowerAddress: string
) {
  const bnAmount = convertToBN(amountToWithdraw);
  // Get total collateral of loan
  const loanCollateral = await loansInterface.methods.getCollateralInfo(loanId);
  // Check if withdrawl amount is not greater than total collateral
  if (bnAmount >= loanCollateral[0]) {
    return
  } else {
    return new Promise((resolve, reject) => loansInterface.methods
      .withdrawCollateral(
        bnAmount,
        loanId
      )
      .send({ from: borrowerAddress })
      .on('transactionHash', Notify.hash)
      .on('receipt', resolve)
      .on('error', reject)
    );
  }
}

/**
 * Makes a payment to a loan
 * @param {*} loansInterface Teller protocol's loanInterface contract
 * @param {number} loanId The ID of the loan for which the payment is being made
 * @param {string} amountToRepay The payment amount 
 * @param {string} borrowerAddress The address of the loan borrower
 */
export async function loanRepayment(
  loansInterface: any,
  loanId: number,
  amountToRepay: string,
  borrowerAddress: string 
) {
  // Get loans linked to address
  const borrowerLoans = await loansInterface.methods.getBorrowerLoans(borrowerAddress).call();
  // Check if loanId is linked to the borrower's address
  if (borrowerLoans.includes(loanId)) {
    const bnAmount = convertToBN(amountToRepay);
    return new Promise((resolve, reject) => loansInterface.methods
      .repay(
        bnAmount,
        loanId
      )
      .send({ from: borrowerAddress })
      .on('transactionHash', Notify.hash)
      .on('receipt', resolve)
      .on('error', reject)
      );
  } else {
    return
  }
}

/**
 * Liquidates an expired or undercollateralized loan
 * @param {*} loansInterface Teller protocol's loanInterface contract
 * @param {number} loanId The ID of the loan being liquidated
 * @param {string} liquidatorAddress The address of the loan liquidator
 */
export async function liquidateLoan(
  loansInterface: any,
  loanId: number,
  liquidatorAddress: string
) {
  return new Promise((resolve, reject) => loansInterface.methods
    .liquidateLoan(
      loanId
    )
    .send({ from: liquidatorAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}