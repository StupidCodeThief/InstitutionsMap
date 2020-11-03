const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const createToken = (data, expiresIn) => {
  return jwt.sign(data, config.get("jwtSecret"), { expiresIn });
};

const decodeToken = (token) => {
  return jwt.verify(token, config.get("jwtSecret"));
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const sendRecoverPasswordLink = async (email, url) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: config.get("email"),
      pass: config.get("emailPassword")
    }
  });

  await transporter.sendMail({
    from: `"Institutions map" <${config.get("email")}>`,
    to: email,
    subject: "Reset password",
    html: `Hi!<br/><br/>You made a request to change the password.<strong>Follow the link</strong> to set a new password.<br/><hr/><a href=${url}>Click here.</a>`
  });
};

module.exports = {
  createToken,
  hashPassword,
  sendRecoverPasswordLink,
  decodeToken
};
