'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const plaidRouter = require('./api/plaid');

app.use(cors());

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/plaid', plaidRouter.router);

app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
});
