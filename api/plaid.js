/**
 * @namespace PlaidAPI
 * @category API
 */

const express = require('express');
const plaid = require('plaid');
const process = require('process');
const moment = require('moment');
const Web3 = require('web3');
const Transaction = require('ethereumjs-tx').Transaction;

const ZCMonthlyIncomeOracle = require('./abi/ZCMonthlyIncomeOracle.json');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;

const pKey = Buffer.from(PRIVATE_KEY, 'hex');

const web3 = new Web3(RPC_URL);

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: '2018-05-22' }
);

/**
 * The router object for Plaid related URL Handlers.
 * @name PlaidRouter
 * @memberof PlaidAPI
 */
const router = express.Router();

// TODO: expose a database storage and remove this. It's a memory leak.
const store = {};

async function oracleSetMonthlyIncome(oracle, lenderAddress, value) {
  const txCount = await web3.eth.getTransactionCount(lenderAddress);
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    to: CONTRACT_ADDRESS,
    data: oracle.methods.setMonthlyIncome(lenderAddress, value).encodeABI()
  };

  const tx = new Transaction(txObject, {'chain':'ropsten'});
  tx.sign(pKey);

  var serializedTx = tx.serialize();

  const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  return receipt;
}

async function setIncomeOracle(lenderAddress, value) {
  const oracle = new web3.eth.Contract(ZCMonthlyIncomeOracle.abi, CONTRACT_ADDRESS);
  const transaction = await oracleSetMonthlyIncome(oracle, lenderAddress, value);
  return JSON.stringify(transaction);
}

/**
 * Handles the plaid errors from the Plaid API.
 * @function plaidErrorHandler
 * @memberof PlaidAPI
 */
function plaidErrorHandler(err, res) {
  if (!(err instanceof plaid.PlaidError)) {
    res.sendStatus(500);
    return;
  }

  // Indicates plaid API error
  console.log('/exchange token returned an error', {
    error_type: err.error_type,
    error_code: res.statusCode,
    error_message: err.error_message,
    display_message: err.display_message,
    request_id: err.request_id,
    status_code: err.status_code,
  });

  // Inspect error_type to handle the error in your application
  switch(err.error_type) {
      case 'INVALID_REQUEST':
        res.sendStatus(403);
        return;
      case 'INVALID_INPUT':
        res.sendStatus(401);
        return;
      case 'RATE_LIMIT_EXCEEDED':
        res.sendStatus(429);
        return;
      case 'API_ERROR':
        res.sendStatus(500);
        return;
      case 'ITEM_ERROR':
        res.sendStatus(500);
        return;
      default:
        res.sendStatus(500);
        return;
  }

}

/**
 * Middleware to set user access token. Requires ```public_token``` as a body param.
 * @function plaidAuthenticator
 * @memberof PlaidAPI
 */
function plaidAuthenticator(req, res, next) {
  var public_token = req.body.public_token;
  if (!public_token) {
    return res.status(401).send("Public token required.");
  }

  if (store[public_token]) {
    req.access_token = store[public_token];
    return next();
  }

  plaidClient.exchangePublicToken(public_token)
    .then(res => {
        const access_token = res.access_token;
        store[public_token] = access_token;
        req.access_token = store[public_token];
        return next();
    })
    .catch(err => plaidErrorHandler(err, res));
}

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

function fetchPlaidIncome(access_token) {
  return new Promise(function(resolve, reject) {
    plaidClient.getIncome(
      access_token,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve({ transactions: res })
      }
    );
  });
}

async function processIncome(access_token, id) {
  const transactionData = await fetchPlaidIncome(access_token);
  const income = transactionData.income.projected_yearly_income;
  const transaction = await setIncomeOracle(id, income);
  return transactionData;
}

/**
 * Gets user's income. Requires ```access_token``` as a request param.
 * @function getIncome
 * @memberof PlaidAPI
 */
function getIncome(request, response) {
  const access_token = request.access_token;
  const lenderAddress = request.lenderAddress;
  processIncome(access_token, lenderAddress)
    .then(res => response.json({ transactions: res }))
    .catch(err => plaidErrorHandler(err, response));
}

router.post('/transactions', plaidAuthenticator, getTransactions);

router.post('/income', plaidAuthenticator, getIncome);

module.exports = {
  router
};
