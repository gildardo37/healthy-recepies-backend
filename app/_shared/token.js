const config = require("../config/config");
const jwt = require("jsonwebtoken");
const db = require("../config/db.connection");

// Verify and validate if token exists
exports.verify = (req, res, next) => {
  const getTokenInfo = this.tokenInfo(req, res);

  if (getTokenInfo.id_user) next();
  else res.send({ message: "Somthing went wrong, try again." });
};

// shows tokens information
exports.getInfo = (req, res) => {
  const getTokenInfo = this.tokenInfo(req, res);
  res.send(getTokenInfo);
};

//create token
exports.create = (data, expireTime) => {
  return jwt.sign(data, config.key, { expiresIn: expireTime });
};

// returns token information
exports.tokenInfo = (req, res) => {
  let tokenData;
  try {
    const accessHeader =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!accessHeader) {
      res.status(401).send({ message: "Access denied, need token!" });
      return;
    }

    const accessToken = accessHeader.split(" ")[1];
    if (!accessToken) {
      res.status(401).send({ message: "Access denied" });
      return;
    }

    jwt.verify(accessToken, config.key, (error, data) => {
      if (error) {
        res.status(401).send({
          message: "This token has expired or is incorrect.",
          status: 1,
        });
        return;
      } else tokenData = data;
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong, try again." });
    return;
  }
  return tokenData;
};
