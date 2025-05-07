const Joi = require("joi");

exports.socailValidation = (body) => {
  const schema = Joi.object({
    social_name: Joi.string()
      .min(3)
      .messages({
        "string.empty": "Bo'sh bo'lishi mumkin emas",
        "any.required": "Lu'gat albatta kiritilishi kerak",
      })
      .required(),
    social_icon_file: Joi.string().default("/social_icon/icon.png"),
  });

  return schema.validate(body);
};
