import { TokenDataInterface, LoanInterface } from "../context/types";
import { loanDeposit } from "./DashboardBorrowActions";

export const calculateCollateralPercent = (
  tokenData: TokenDataInterface,
  loan: LoanInterface
) => {
  const newCollateralPercent =
    Math.round(
      ((loan.collateralAmount *
        parseFloat(tokenData[loan.collateralToken].price)) /
        (loan.totalOwedAmount * parseFloat(tokenData[loan.token].price))) *
        10000
    ) / 100;
  return newCollateralPercent;
};

export const getMaxWithdrawAmount = (
  tokenData: TokenDataInterface,
  loan: LoanInterface
) => {
  let maxAmount =
    Math.round(
      (loan.collateralAmount -
        ((loan.terms.collateralRatio / 100) *
          (loan.totalOwedAmount * parseFloat(tokenData[loan.token].price))) /
          parseFloat(tokenData[loan.collateralToken].price)) *
        100
    ) / 100;
  if (maxAmount < 0) {
    maxAmount = 0;
  }
  return maxAmount;
};
export const getEtherscanLink = (hash: string, network: string) => {
  if (network == "4") return `https://rinkeby.etherscan.io/tx/${hash}`;
  else if (network == "3") return `https://ropsten.etherscan.io/tx/${hash}`;
  else return `https://etherscan.io/tx/${hash}`;
};
