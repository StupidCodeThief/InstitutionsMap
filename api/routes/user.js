const express = require("express");

const router = express.Router();

const { getUsers } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/users", auth, getUsers);

module.exports = router;
