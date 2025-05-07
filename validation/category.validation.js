const Joi = require("joi");

exports.categoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    parent_category_id: Joi.string(),
  });

  return schema.validate(body);
};
