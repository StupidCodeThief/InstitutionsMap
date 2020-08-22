const Joi = require("@hapi/joi");

const userNameSchema = Joi.string().min(2).max(20).required();

const emailSchema = Joi.string().required().email().max(64);

const passwordSchema = Joi.string()
  .required()
  .min(8)
  .max(32)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

const validateRegisterData = (userName, email, password) => {
  const errors = {};

  const userNameValidate = userNameSchema.validate(userName);
  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (userNameValidate.error) {
    errors.userName = userNameValidate.error.details[0].message.replace('"value"', "Name");
  }

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"value"', "Email");
  }

  if (passwordValidate.error) {
    if (passwordValidate.error.details[0].context.regex) {
      errors.password = "Password must contain  at least one uppercase letter, one lowercase letter, one number and one special character";
    } else {
      errors.password = passwordValidate.error.details[0].message.replace('"value"', "Password");
    }
  }

  return errors;
};

const validateLoginData = (email, password) => {
  const errors = {};

  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"value"', "Email");
  }

  if (passwordValidate.error) {
    if (passwordValidate.error.details[0].context.regex) {
      errors.password = "Password must contain  at least one uppercase letter, one lowercase letter, one number and one special character";
    } else {
      errors.password = passwordValidate.error.details[0].message.replace('"value"', "Password");
    }
  }

  return errors;
};

const validatePassword = (password) => {
  const errors = {};

  const passwordValidate = passwordSchema.validate(password);

  if (passwordValidate.error) {
    if (passwordValidate.error.details[0].context.regex) {
      errors.password = "Password must contain  at least one uppercase letter, one lowercase letter, one number and one special character";
    } else {
      errors.password = passwordValidate.error.details[0].message.replace('"value"', "Password");
    }
  }

  return errors;
};

module.exports = { validateRegisterData, validateLoginData, validatePassword };
