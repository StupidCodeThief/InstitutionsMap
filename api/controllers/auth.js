const isEmpty = require("lodash/isEmpty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { OAuth2Client } = require("google-auth-library");

const { BadRequest } = require("../utils/errors");
const { validateRegisterData, validateLoginData } = require("../validation/auth");
const { setCookie } = require("../utils/setCookie/setCookie");
const User = require("../database/models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginData(email, password);

    if (!isEmpty(errors)) {
      throw new BadRequest(errors);
    }

    let user = await User.findOne({ email });

    if (!user) {
      throw new BadRequest({ errors: [{ msg: "Invalid credentials" }] }, "Authentication Error");
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

const register = async (req, res) => {
  const { userName, email, password, avatar } = req.body;

  const errors = validateRegisterData(userName, email, password);

  if (!isEmpty(errors)) {
    throw new BadRequest(errors);
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new BadRequest({ errors: [{ msg: "User already exists" }] }, "Registration Error");
    }

    user = new User({
      userName,
      email,
      avatar,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

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

const authenticationGoogle = async (req, res) => {
  const { token } = req.body;
  const CLIENT_ID = config.get("OAuthId");
  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });

    let payload = ticket.getPayload();

    const { name: userName, email, picture: avatar, ID: googleId } = payload;

    let user = await User.findOne({ googleId });

    if (user) {
      payload = {
        user: {
          id: user.id
        }
      };

      setCookie(payload, res);
    }

    user = new User({ userName, email, avatar, googleId });

    await user.save();

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

const authenticationFacebook = async (req, res) => {
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

    if (user) {
      const payload = {
        user: {
          id: user.id
        }
      };

      setCookie(payload, res);
    }

    user = new User({ userName, email, avatar, facebookId });

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

module.exports = { getUser, login, register, authenticationGoogle, authenticationFacebook };
