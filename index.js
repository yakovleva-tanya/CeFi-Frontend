"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

const sslRedirect = () => {
  return (req, res, next) => {
    req.headers["x-forwarded-proto"] !== "https"
      ? res.redirect(301, "https://" + req.hostname + req.originalUrl)
      : next();
  };
};

app.use(sslRedirect());
app.use(express.static("dist"));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
