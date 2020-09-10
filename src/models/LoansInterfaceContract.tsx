import Notify from "./Web3Notify";
import ERC20 = require('./../abi/contracts/ERC20Detailed.json');
import { Web3State } from './../context/app';
import { globalDecimals } from './../util/constants';

/**
 * @notice Converts a given amount into a BN instance
 * @param amount The amount to be converted
 */
function convertToBN(
  amount: string
) {
  const result = (parseFloat(amount) * globalDecimals).toLocaleString('fullwide', { useGrouping: false });
  return result;
}

async function getCollateralToken(
  loansInterface: any,
  web3State: Web3State
) {
  const collateralTokenAddress = await loansInterface.methods.collateralToken().call();
  return new web3State.web3.eth.Contract(ERC20.abi, collateralTokenAddress, {});
}

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
 * @notice Creates/processes a loan with loan request and terms
 * @param loanRequest The Teller protocol loan request
 * @param loanResponses The list of the Teller protocol loan responses
 * @param loansInterface Teller protocol's loansInterface contract
 * @param collateralAmount The amount of collateral required for the loan
 * @param borrowerAddress The wallet address of the borrower
 */
export async function createLoanWithTerms(
  loanRequest: any,
  loanResponses: any,
  loansInterface: any,
  collateralAmount: string,
  borrowerAddress: string
) {
  const bnAmount = convertToBN(collateralAmount);
  return new Promise((resolve, reject) => loansInterface.methods
    .createLoanWithTerms(
      loanRequest,
      loanResponses,
      bnAmount
    )
    .send( { from: borrowerAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );  
}

// erc20.approve(loansInterface)

/**
 * @notice Deposits collateral into a created loan
 * @param loansInterface Teller protocol's loansInterface contract
 * @param borrowerAddress The address of the loan borrower
 * @param loanId The ID of the loan the collateral is for
 * @param amount The amount of collateral being deposited
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
 * @param loansInterface Teller protocol's loanInterface contract
 * @param loanId The ID of the loan being taken out
 * @param amountToBorrow The amount to be borrowed
 * @param borrowerAddress The address of the loan borrower
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
 * @param loansInterface Teller protocol's loanInterface contract
 * @param loanId The ID of the loan from which collateral is being withdrawn
 * @param amountToWithdraw The amount of collateral to withdraw
 * @param borrowerAddress The address of the loan borrower
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
  if (bnAmount > loanCollateral[0]) {
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
 * @param loansInterface Teller protocol's loanInterface contract
 * @param loanId The ID of the loan for which the payment is being made
 * @param amountToRepay The payment amount 
 * @param borrowerAddress The address of the loan borrower
 */
export async function repayLoan(
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
 * @param loansInterface Teller protocol's loanInterface contract
 * @param loanId The ID of the loan being liquidated
 * @param liquidatorAddress The address of the loan liquidator
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