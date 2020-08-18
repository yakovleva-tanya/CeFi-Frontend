"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const sslRedirect = () => {
  return (req, res, next) => {
    req.headers["x-forwarded-proto"] !== "https"
      ? res.redirect(status, "https://" + req.hostname + req.originalUrl)
      : next();
  };
};

app.use(sslRedirect());
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
