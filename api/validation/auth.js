const Joi = require("@hapi/joi");

const userNameSchema = Joi.string().min(2).max(20).required();

const emailSchema = Joi.string().required().email().max(64);

const passwordSchema = Joi.string()
  .required()
  .regex(/^(?=.*?[A-Z-А-Я])(?=.*?[#?!@$%^&*-])/)
  .min(8)
  .max(32);

// const RegisterSchemaValidation = Joi.object({
//   userNameSchema: Joi.string().min(2).max(20).required(),
//   emailSchema: Joi.string().required().email().max(64),
//   passwordSchema: Joi.string()
//     .required()
//     .regex(/^(?=.*?[A-Z-А-Я])(?=.*?[#?!@$%^&*-])/)
//     .min(8)
//     .max(32)
// });

const validateRegisterData = (userName, email, password) => {
  const errors = {};

//   const validation = RegisterSchemaValidation.validate({ userName, email, password });

  const userNameValidate = userNameSchema.validate(userName);
  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (userNameValidate.error) {
    errors.userName = userNameValidate.error.details[0].message.replace(
      '"value"',
      'Name'
    );
  }

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace(
      '"value"',
      'Email'
    );
  }

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace(
      '"value"',
      'Password'
    );
  }

  return errors;
};

const validateLoginData = (email, password) => {
  const errors = {};

  const emailValidate = emailSchema.validate(email);
  const passwordValidate = passwordSchema.validate(password);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace(
      '"value"',
      'Email'
    );
  }

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace(
      '"value"',
      'Password'
    );
  }

  return errors;
};


module.exports = { validateRegisterData, validateLoginData };
