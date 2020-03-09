/**
 * @namespace oracleAPI
 * @category API
 */

 const ZCMonthlyIncomeOracle = require('./abi/ZCMonthlyIncomeOracle.json');
 const Web3 = require('web3');
 const Transaction = require('ethereumjs-tx').Transaction;

 const PRIVATE_KEY = process.env.PRIVATE_KEY;
 const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
 const RPC_URL = process.env.RPC_URL;
 const pKey = Buffer.from(PRIVATE_KEY, 'hex');

 const web3 = new Web3(RPC_URL);



/**
 * The router object for Plaid related URL Handlers.
 * @name OracleRouter
 * @memberof oracleAPI
 */
const router = express.Router();

/**
 * Gets user's transactions. Requires ```access_token``` as a request param.
 * @function getTransactions
 * @memberof PlaidAPI
 */
function getTransactions(request, response) {
  const access_token = request.access_token;
  const now = moment();
  const today = now.format('YYYY-MM-DD');
  const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

  plaidClient.getTransactions(
    access_token,
    thirtyDaysAgo,
    today,
    (err, res) => {
      if (err) {
        return plaidErrorHandler(err, response);
      }
      response.json({ transactions: res })
    }
  );
}

/**
 * Gets user's income. Requires ```access_token``` as a request param.
 * @function getTransactions
 * @memberof PlaidAPI
 */
function setIncome(request, response) {
  const access_token = request.access_token;
  plaidClient.getIncome(
    access_token,
    (err, res) => {
      if (err) {
        return plaidErrorHandler(err, response);
      }
      response.json({ transactions: res })
    }
  );
}

router.post('/transactions', plaidAuthenticator, getTransactions);

router.post('/income', plaidAuthenticator, getIncome);

module.exports = {
  router
};
