const Joi = require("joi");

exports.adminValidation = (body) => {
  const schema = Joi.object({
    admin_name: Joi.string().min(3).max(100).required(),
    admin_email: Joi.string().email().required(),
    admin_phone: Joi.string().min(7).max(20).required(),
    admin_password: Joi.string().min(6).required(),
    admin_is_active: Joi.boolean().optional(),
    admin_is_creator: Joi.boolean().optional(),
  });

  return schema.validate(body);
};
