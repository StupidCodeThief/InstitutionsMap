const Joi = require("@hapi/joi");

const placeIdSchema = Joi.string().required();

const validatePlaceId = (placeId) => {
  const errors = {};

  const placeIdValidate = placeIdSchema.validate(placeId);

  if (placeIdValidate.error) {
    errors.placeId = placeIdValidate.error.details[0].message.replace('"value"', "place_id");
  }
};

module.exports = { validatePlaceId };
