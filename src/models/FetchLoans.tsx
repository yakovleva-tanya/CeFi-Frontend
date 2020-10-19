// Import modules
const { request } = require("graphql-request");
import { LoanInterface } from "../context/types";
import { loansTestData } from "../context/testdata";
import { FetchTokenData } from "./FetchTokenData";
import { gql, ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

/**
 * @dev Retrieves the gql query url given the network id
 * @param {string} network The id of the network being used
 */
const getUrl = (network: string) => {
  if (network === "3") {
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-ropsten";
  } else if (network === "4") {
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-rinkeby";
  } else
    return "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-mainnet";
};

/**
 * @dev The gql query being used to retrieve loans from the graph
 * @param {string} address The wallet address for the query
 */
const loansQuery = (address: string) => gql`
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

/**
 * @dev Returns current token prices for ETH, LINK, DAI & USDC
 */
const tokenData = async () => {
  const tokens = await FetchTokenData();
  const collateralRates: any = {
  ETH: tokens.ETH.price, //   ETH: 441.25,
  LINK: tokens.LINK.price //   LINK: 14.92,
}
  const tokenRates: any = {
    DAI: tokens.DAI.price, //   DAI: 1.01,
    USDC: tokens.USDC.price //   USDC: 0.99,
  }
}


/**
 * @dev Initiaties a new apollo client 
 * @param {string} url The url of the client
 */
const makeClient = (url: string) => new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: url }),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

/**
 * @dev Retieves the loans associated with a particular wallet address
 * @param {string} network The current network being used
 * @param {string} address The wallet address for which loans are being fetched
 */
const FetchLoans = async (network: string, address: string) => {
  const currentTime = Date.now();
  try {
    const url = getUrl(network);
    const query = loansQuery(address);

    //fetch loans
    const client = makeClient(url);
    const result = await client.query({
      query,
    });
    console.log("borrow loans<>", result.data.borrower.loans);
    const res = result.data.borrower.loans;
    // const res = loansTestData;
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
