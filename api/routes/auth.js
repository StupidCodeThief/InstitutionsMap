const express = require("express");

const router = express.Router();

const {
  getUser,
  login,
  register,
  authenticationGoogle,
  authenticationFacebook,
  addFacebookToAccount,
  addGoogleToAccount,
  addEmailToAccount
} = require("../controllers/auth");
const { passwordRecovery, resetPassword } = require("../controllers/forgotPassword");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/login", auth, getUser);
router.post("/register", register);
router.post("/google", authenticationGoogle);
router.post("/facebook", authenticationFacebook);

router.post("/password", passwordRecovery);
router.post("/password/reset", resetPassword);

router.post("/user/addFacebook", addFacebookToAccount);
router.post("/user/addGoogle", addGoogleToAccount);
router.post("/user/addEmail", addEmailToAccount);

module.exports = router;
