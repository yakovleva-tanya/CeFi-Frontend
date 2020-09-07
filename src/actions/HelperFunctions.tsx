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
  return (
    Math.round(
      (loan.collateralAmount -
        ((loan.terms.collateralRatio / 100) *
          (loan.totalOwedAmount * parseFloat(tokenData[loan.token].price))) /
          parseFloat(tokenData[loan.collateralToken].price)) *
        100
    ) / 100
  );
};
export const getEtherscanLink = (hash: string, network: string) => {
  if (network == "4") return `https://rinkeby.etherscan.io/tx/${hash}`;
  else if (network == "3") return `https://ropsten.etherscan.io/tx/${hash}`;
  else return `https://etherscan.io/tx/${hash}`;
};

export const exchangeCurrency = (
  amount: number,
  initialCurrency: string,
  tokenData: TokenDataInterface,
  finalCurrency?: string
) => {
  const initialCurrencyPrice = parseFloat(tokenData[initialCurrency].price);
  const finalCurrencyPrice = finalCurrency
    ? parseFloat(tokenData[finalCurrency].price)
    : 1;
  return (amount * initialCurrencyPrice) / finalCurrencyPrice;
};
