'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var sslRedirect = require(‘heroku-ssl-redirect’);

app.use(sslRedirect());
app.use(express.static('dist'));


app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
});
