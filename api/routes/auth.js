const express = require("express");

const router = express.Router();

const { getUser, login, register, authenticationGoogle, authenticationFacebook } = require("../controllers/auth");
const { forgotPassword } = require("../controllers/forgotPassword");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/login", auth, getUser);
router.post("/register", register);
router.post("/google", authenticationGoogle);
router.post("/facebook", authenticationFacebook);

router.post("/password", forgotPassword);

module.exports = router;
