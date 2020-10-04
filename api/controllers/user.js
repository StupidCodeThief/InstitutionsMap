const User = require("../database/models/User");

const { NotFound } = require("../utils/errors");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).limit(10);

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
  getUsers
};
