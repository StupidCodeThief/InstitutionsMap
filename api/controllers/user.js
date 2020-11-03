const User = require("../database/models/User");

const { NotFound } = require("../utils/errors");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      throw new BadRequest({ errors: [{ msg: "User not found" }] }, "User not found");
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      throw new BadRequest({ errors: [{ msg: "User not found" }] }, "User not found");
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).limit(10).select("-password");

    if (!users) {
      throw new NotFound("404", "No users found");
    }

    res.json(users);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  getUsers, 
  getUser,
  getUserById
};
