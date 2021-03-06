const isEmpty = require("lodash/isEmpty");
const bcrypt = require("bcryptjs");
const config = require("config");
const { OAuth2Client } = require("google-auth-library");

const { BadRequest, NotFound } = require("../utils/errors");
const { validateRegisterData, validateLoginData } = require("../validation/auth");
const { setCookie, clearCookie } = require("../utils/setCookie/setCookie");
const User = require("../database/models/User");
const { getHashedPassword } = require("../utils/bcrypt/hashedPassword");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    const errors = validateLoginData(email, password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    let user = await User.findOne({ email });

    if (!user) {
      throw new NotFound("User not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequest({ errors: [{ msg: "Invalid credentials" }] }, "Authentication Error");
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    setCookie(payload, res);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    clearCookie(res);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { userName, email, password, avatar = "" } = req.body;

    const errors = validateRegisterData(userName, email, password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    let user = await User.findOne({ email });

    if (user) {
      throw new BadRequest({ errors: [{ msg: "User already exists" }] }, "User already exists");
    }

    user = new User({
      userName,
      email,
      avatar,
      password
    });

    user.password = await getHashedPassword(password);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    setCookie(payload, res);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const authenticationGoogle = async (req, res, next) => {
  const { token } = req.body;
  const CLIENT_ID = config.get("OAuthId");
  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });

    let payload = ticket.getPayload();

    const { name: userName, email, picture: avatar, sub: googleId } = payload;

    let user = await User.findOne({ googleId: googleId });

    if (!user) {
      if (email) {
        user = await User.findOneAndUpdate({ email: email }, { googleId: googleId });
      }

      if (!user) {
        user = new User({ userName, email, avatar, googleId });
      }

      await user.save();
    }

    payload = {
      user: {
        id: user.id
      }
    };

    setCookie(payload, res);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const authenticationFacebook = async (req, res, next) => {
  const {
    name: userName,
    email,
    picture: {
      data: { url: avatar }
    },
    id: facebookId
  } = req.body;

  try {
    let user = await User.findOne({ facebookId });

    if (!user) {
      if (email) {
        user = await User.findOneAndUpdate({ email: email }, { facebookId: facebookId });
      }

      if (!user) {
        user = new User({ userName, email, avatar, facebookId });
      }

      await user.save();
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    setCookie(payload, res);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const addFacebookToAccount = async (req, res, next) => {
  try {
    const { userID: facebookId } = req.body;

    const user = await User.findOneAndUpdate({ _id: req.user.id }, { facebookId: facebookId });

    await user.save();

    res.json({ msg: "Account updated" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const addGoogleToAccount = async (req, res, next) => {
  try {
    const { token } = req.body;
    const CLIENT_ID = config.get("OAuthId");
    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });

    let payload = ticket.getPayload();

    const { sub: googleId } = payload;

    const user = await User.findOneAndUpdate({ _id: req.user.id }, { googleId: googleId });

    await user.save();

    res.json({ msg: "Account updated" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const addEmailToAccount = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const errors = validateLoginData(email, password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    password = await getHashedPassword(password);

    const user = await User.findOneAndUpdate({ _id: req.user.id }, { email: email, password: password });

    await user.save();

    res.json({ msg: "Account updated" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  login,
  register,
  authenticationGoogle,
  authenticationFacebook,
  addFacebookToAccount,
  addGoogleToAccount,
  addEmailToAccount,
  logout
};
