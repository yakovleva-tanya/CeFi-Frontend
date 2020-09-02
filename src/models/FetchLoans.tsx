const { request } = require("graphql-request");
import { LoanInterface } from "../context/Types";
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

const FetchLoans = async (network: string, address: string) => {
  try {
    const url = getUrl(network);
    const query = loansQuery(address);
    //fetch loans

    const loans: Array<LoanInterface> = loansTestData;
    return loans;
  } catch (err) {
    console.log(err);
  }
};
export default FetchLoans;
