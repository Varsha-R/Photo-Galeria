const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    // Validating token
    const decodedToken = jwt.verify(token, keys.jwtSecretKey);
    // Let the request continue and add to the request
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
