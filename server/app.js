const express = require("express");

const keys = require("./config/keys");

const app = express();

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
