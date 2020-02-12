'use strict';

const express = require('express');
const plaid = require('plaid');
const process = require('process');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: '2018-05-22' }
);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/plaid_exchange', (request, response) => {
  var public_token = request.body.public_token;

  plaidClient.exchangePublicToken(public_token).then(res => {
    const access_token = res.access_token;

    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

    plaidClient.getTransactions(
      access_token,
      thirtyDaysAgo,
      today,
      (err, res) => response.json({ transactions: res })
    );
  }).catch(err => {
    // Indicates a network or runtime error.
    if (!(err instanceof plaid.PlaidError)) {
      response.sendStatus(500);
      return;
    }

    // Indicates plaid API error
    console.log('/exchange token returned an error', {
      error_type: err.error_type,
      error_code: response.statusCode,
      error_message: err.error_message,
      display_message: err.display_message,
      request_id: err.request_id,
      status_code: err.status_code,
    });

    // Inspect error_type to handle the error in your application
    switch(err.error_type) {
        case 'INVALID_REQUEST':
          // ...
          break;
        case 'INVALID_INPUT':
          // ...
          break;
        case 'RATE_LIMIT_EXCEEDED':
          // ...
          break;
        case 'API_ERROR':
          // ...
          break;
        case 'ITEM_ERROR':
          // ...
          break;
        default:
          // fallthrough
    }
    response.sendStatus(500);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
});
