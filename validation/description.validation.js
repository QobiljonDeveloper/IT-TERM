const Joi = require("joi");

exports.descriptionValidation = (body) => {
  const schema = Joi.object({
    description: Joi.string(),
    category_id: Joi.string(),
  });

  return schema.validate(body);
};
