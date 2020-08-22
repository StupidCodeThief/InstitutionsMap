const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("config");
const isEmpty = require("lodash/isEmpty");

const { BadRequest, NotFound } = require("../utils/errors");
const { validatePassword } = require("../validation/auth");
const { createToken, sendRecoverPasswordLink } = require("../utils/passwordRecovery/passwordRecovery");
const User = require("../database/models/User");

const passwordRecovery = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email, googleId: undefined, facebookId: undefined }).select("-password");

    if (!user) {
      throw new NotFound("User not exists");
    }

    const token = createToken({ user: { id: user.id } }, config.get("jwtSecretExpiresIn"));
    const setResetUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}/reset?token=${token}`;

    sendRecoverPasswordLink(email, setResetUrl);

    res.json({ msg: "Recover link was sent" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.query;

  try {
    const errors = validatePassword(password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    const userId = jwt.verify(token, config.get("jwtSecret"));

    const user = await User.findOne({ id: userId, googleId: undefined, facebookId: undefined });

    if (!user) {
      throw new BadRequest("User has no password, please add another login type");
    }

    if (user.password === password) throw new BadRequest("Your new password can not be similar to current password");
    user.password = password;

    await user.save();

    res.json({ msg: "Password successfully changed", pass: password });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  passwordRecovery,
  resetPassword,
};
