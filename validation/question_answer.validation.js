const Joi = require("joi");

exports.qaValidation = (body) => {
  const schema = Joi.object({
    question: Joi.string().min(3).max(100).required(),
    answer: Joi.string().min(5).max(200).required(),
    is_checked: Joi.boolean().optional(),
    user_id: Joi.string().required(),
    expert_id: Joi.string().required(),
  });

  return schema.validate(body);
};
