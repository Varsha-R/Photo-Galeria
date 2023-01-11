const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
app.use(bodyParser.json());

// to handle CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATH, DELETE");
  next();
});

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
}); // Only reached if there is a request which doesn't have a response

// Special middleware func for error - should be after above declaration
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
