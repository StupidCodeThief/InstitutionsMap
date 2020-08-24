const jwt = require("jsonwebtoken");
const config = require("config");

const setCookie = (payload, res) => {
  jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
    if (err) throw err;
    res.cookie("token", token, { maxAge: 36000, httpOnly: true });
    res.send("Set cookie");
  });
};

module.exports = { setCookie };
