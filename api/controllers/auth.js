const isEmpty = require("lodash/isEmpty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { validateRegisterData, validateLoginData } = require("../validation/auth");
const User = require("../database/models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validateLoginData(email, password);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.cookie("token", token, { maxAge: 3600 * 24, httpOnly: true });
      res.send("Set cookie");
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  const errors = validateRegisterData(userName, email, password);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      userName,
      email,
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

    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.cookie("token", token, { maxAge: 3600 * 24, httpOnly: true });
      res.send("Set cookie");
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { login, register };
