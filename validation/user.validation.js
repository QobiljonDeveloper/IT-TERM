const Joi = require("joi");

exports.userValidation = (body) => {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    info: Joi.string().optional(),
    user_photo: Joi.string().uri().optional(),
    is_active: Joi.boolean().optional(),
  });

  return schema.validate(body);
};
