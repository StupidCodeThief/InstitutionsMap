const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (!req.cookies?.token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not wailed" });
  }
};
