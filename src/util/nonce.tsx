// import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

// TODO Move to dev secrets
const tellerSubgraphUrl = "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-rinkeby";

// const tellerSubgraphClient = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: createHttpLink({ uri: tellerSubgraphUrl }),
// });

const makeClient = () => new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: tellerSubgraphUrl }),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

/**
 * For a given borrower address, get how many requests that address
 * has submitted on-chain so far.
 * @param {string} borrower - Ethereum wallet address of the user (e.g. "0x...")
 * @param {string} borrowedAsset - Borrowed asset (e.g. "DAI")
 * @param {string} collateralAsset - Collateral asset (e.g. "ETH")
 * @returns {number} - The user's current on-chain nonce
 */
export async function _nonce(
  borrower: string,
  borrowedAsset: string,
  collateralAsset: string,
): Promise<string> {
  const query = gql`
    {
      borrowerNoncesChanges(
        first: 1
        orderBy: timestamp
        orderDirection: desc
        where: {
          borrower: "${borrower}"
          token: "${borrowedAsset}"
          collateralToken: "${collateralAsset}"
        }
      ) {
        nonce
      }
    }
  `;
  try {
    const client = makeClient();
    const result = await client.query({
      query,
    });
    console.log(JSON.stringify({ result }, null, 2));
    let nonce = result.data.borrowerNoncesChanges[0].nonce;
    if (!nonce) throw new Error("Nonce is undefined, returning '0'");
    nonce = Number(nonce);
    return (nonce + 1).toString();
  } catch (e) {
    console.log(e);
    return "0";
  }
}