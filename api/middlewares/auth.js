const jwt = require("jsonwebtoken");
const config = require("config");

const { BadRequest } = require("../utils/errors");

module.exports = (req, res, next) => {
  if (!req.cookies?.token) {
    throw new BadRequest("No token, authorization denied");
  }

  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
