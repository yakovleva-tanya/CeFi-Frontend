const { request } = require("graphql-request");
import { LoanInterface } from "../context/types";
import { loansTestData } from "../context/testdata";

const getUrl = (network: string) => {
  if (network === "3") {
    return "https://thegraph.com/explorer/subgraph/salazarguille/teller-protocol-subgraph-ropsten";
  } else if (network === "4") {
    return "https://thegraph.com/explorer/subgraph/salazarguille/teller-protocol-subgraph-rinkeby";
  } else
    return "https://thegraph.com/explorer/subgraph/teller-protocol/subgraph-mainnet";
};

const loansQuery = (address: string) => `
  {
    borrower(id:"${address}"){
    id
    loans {
      id
        token
      collateralToken
      transaction{
        hash
      }
      terms{
        interestRate
        collateralRatio
        maxLoanAmount
        duration
        expiryAt
      }
      startDate
      endDate
      amountBorrowed
      status
      repayments{
        amount
      }
      totalRepaidAmount
      totalOwedAmount
      collateralDeposits{
        amount
      }
      totalCollateralDepositsAmount
      collateralWithdrawns{
        amount
      }
      totalCollateralWithdrawalsAmount
      liquidation{
        collateralOut
        tokensIn
      }
    }
    }
  }
`;

//TODO fetch real rates
const collateralRates: any = {
  ETH: 441.25,
  LINK: 14.92,
};
const tokenRates: any = {
  DAI: 1.01,
  USDC: 0.99,
};
const FetchLoans = async (network: string, address: string) => {
  const currentTime = Date.now();
  try {
    const url = getUrl(network);
    const query = loansQuery(address);

    //fetch loans
    const res = loansTestData;

    const loans: Array<LoanInterface> = res.map((loan: LoanInterface) => {
      loan.collateralAmount =
        loan.totalCollateralDepositsAmount -
        loan.totalCollateralWithdrawalsAmount;
      loan.currentCollateralPercent =
        (loan.collateralAmount /
          tokenRates[loan.token]/
          (loan.totalOwedAmount / collateralRates[loan.collateralToken])) *
        100;
      const timeTillExpires = Math.round(
        (currentTime - loan.terms.expiryAt) / (60 * 60 * 24 * 1000)
      );
      let statusName = "";
      if (loan.status === "Closed") {
        statusName = "Repaid";
      } else if (timeTillExpires > 0) {
        statusName = "Outstanding";
      } else {
        statusName = "Overdue";
      }

      loan.statusName = statusName;
      loan.timeTillExpires = timeTillExpires;
      return loan;
    });

    return loans;
  } catch (err) {
    console.log(err);
  }
};
export default FetchLoans;