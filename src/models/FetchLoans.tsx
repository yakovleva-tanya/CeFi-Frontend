const { request } = require("graphql-request");
import { LoanInterface } from "../context/types";
import { loansTestData } from "../context/testdata";
import { FetchTokenData } from "./FetchTokenData";

const getUrl = (network: string) => {
  if (network === "3") {
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-ropsten";
  } else if (network === "4") {
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-rinkeby";
  } else
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-mainnet";
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

const tokenData = async () => {
  const tokens = await FetchTokenData();
  const collateralRates: any = {
  ETH: tokens.ETH.price,
  LINK: tokens.LINK.price
}
  const tokenRates: any = {
    DAI: tokens.DAI.price,
    USDC: tokens.USDC.price
  }
}

//TODO fetch real rates
// const collateralRates: any = {
//   ETH: 441.25,
//   LINK: 14.92,
// };
// const tokenRates: any = {
//   DAI: 1.01,
//   USDC: 0.99,
// };

const FetchLoans = async (network: string, address: string) => {
  const currentTime = Date.now();
  try {
    const url = ""; //getUrl(network);
    const query = loansQuery(address);

    //fetch loans
    const res = loansTestData;
    const loans: Array<LoanInterface> = res.map((loan: LoanInterface) => {
      loan.collateralAmount =
        loan.totalCollateralDepositsAmount -
        loan.totalCollateralWithdrawalsAmount;
      const timeTillExpires = Math.round(
        (loan.terms.expiryAt - currentTime) / (60 * 60 * 24 * 1000)
      );
      let statusName = "";
      if (loan.status === "Closed") {
        statusName = "Repaid";
      } else if (timeTillExpires >= 0) {
        statusName = "Outstanding";
      } else {
        statusName = "Overdue";
      }
      loan.currentCollateralPercent = 0;
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
