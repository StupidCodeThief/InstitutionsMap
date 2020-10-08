const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const isEmpty = require("lodash/isEmpty");

const { BadRequest, NotFound } = require("../utils/errors");
const { validatePassword } = require("../validation/auth");
const { createToken, sendRecoverPasswordLink } = require("../utils/passwordRecovery/passwordRecovery");
const { getHashedPassword } = require("../utils/bcrypt/hashedPassword");
const User = require("../database/models/User");

const passwordRecovery = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new NotFound("User not exists");
    }

    if (!user.password) {
      throw new BadRequest("User has no password, please add email login type");
    }

    const token = createToken({ user: { id: user.id } }, config.get("jwtSecretExpiresIn"));
    const setResetUrl = `${req.protocol}://localhost:3000/password/reset?token=${token}`;

    sendRecoverPasswordLink(email, setResetUrl);

    

    res.json({ msg: "Recover link was sent" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  let { password } = req.body;
  const { token } = req.query;

  try {
    const errors = validatePassword(password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    const userData = jwt.verify(token, config.get("jwtSecret"));
    const userId = userData.user.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new NotFound("User not exists");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) throw new BadRequest("Your new password can not be similar to current password");

    password = await getHashedPassword(password);

    user.password = password;

    await user.save();

    res.json({ msg: "Password successfully changed"});
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  passwordRecovery,
  resetPassword
};
