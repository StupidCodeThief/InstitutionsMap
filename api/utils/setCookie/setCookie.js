const jwt = require("jsonwebtoken");
const config = require("config");

const setCookie = (payload, res) => {
  jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
    if (err) throw err;
    res.cookie("token", token, { maxAge: 1000*60*60*24, httpOnly: true });
    res.send("Set cookie");
  });
};

const clearCookie = (res) => {
  res.clearCookie("token");
  res.send("Clear cookie");
};

module.exports = { setCookie, clearCookie };
