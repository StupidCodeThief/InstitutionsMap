const express = require("express");

const router = express.Router();

const { getUsers, getUser, getUserById } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/users", auth, getUsers);
router.get("/get-user", auth, getUser);
router.get("/get-user/:id", auth, getUserById);

module.exports = router;
