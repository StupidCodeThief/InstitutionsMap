const Joi = require("@hapi/joi");

const placeIdSchema = Joi.string().required();
const commentSchema = Joi.string().required();

const validatePlaceId = (placeId) => {
  const errors = {};

  const placeIdValidate = placeIdSchema.validate(placeId);

  if (placeIdValidate.error) {
    errors.placeId = placeIdValidate.error.details[0].message.replace('"value"', "place_id");
  }
};

const validateComment = (placeId, comment) => {
  const errors = {};

  const placeIdValidate = placeIdSchema.validate(placeId);
  const commentValidate = commentSchema.validate(comment);

  if (placeIdValidate.error) {
    errors.placeId = placeIdValidate.error.details[0].message.replace('"value"', "place_id");
  }

  if (commentValidate.error) {
    errors.comment = commentValidate.error.details[0].message.replace('"value"', "comment");
  }
};

module.exports = { validatePlaceId, validateComment };
