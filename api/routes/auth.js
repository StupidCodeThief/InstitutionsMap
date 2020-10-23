const express = require("express");

const router = express.Router();

const {
  login,
  register,
  authenticationGoogle,
  authenticationFacebook,
  addFacebookToAccount,
  addGoogleToAccount,
  addEmailToAccount,
  logout
} = require("../controllers/auth");
const { passwordRecovery, resetPassword } = require("../controllers/forgotPassword");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.post("/google", authenticationGoogle);
router.post("/facebook", authenticationFacebook);

router.post("/password", passwordRecovery);
router.post("/password/reset", resetPassword);

router.post("/user/addFacebook", auth, addFacebookToAccount);
router.post("/user/addGoogle", auth, addGoogleToAccount);
router.post("/user/addEmail", auth, addEmailToAccount);

module.exports = router;
