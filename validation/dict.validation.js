const Joi = require("joi");

exports.dictValidation = (body) => {
  const schema = Joi.object({
    term: Joi.string()
      .min(2)
      .message("IT Termin 1ta harfdan kam bo'lmasligi kerak")
      .required()
      .messages({
        "string.empty": "Bo'sh bo'lishi mumkin emas",
        "any.required": "Lu'gat albatta kiritilishi kerak",
      }),
  });

  return schema.validate(body);
};
