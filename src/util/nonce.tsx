import { gql, ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

// TODO Move to dev secrets
const tellerSubgraphUrl = "https://api.thegraph.com/subgraphs/name/salazarguille/teller-protocol-subgraph-rinkeby";

const tellerSubgraphClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: tellerSubgraphUrl }),
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
  ): Promise<number> {
    const query = gql`
      query borrowerNoncesChanges(
        $borrower: String!
        $borrowedAsset: String!
        $collateralAsset: String!
      ) {
        borrowerNoncesChanges(
          first: 1
          orderBy: nonce
          orderDirection: desc
          where: { borrower: $borrower, token: $borrowedAsset, collateralToken: $collateralAsset }
        ) {
          nonce
        }
      }
    `;
    try {
      const result = await tellerSubgraphClient.query({
        query,
        variables: {
          borrower,
          borrowedAsset,
          collateralAsset,
        },
      });
      return result.data.nonce ? result.data.nonce : 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }