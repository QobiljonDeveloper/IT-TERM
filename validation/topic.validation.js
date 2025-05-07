const Joi = require("joi");

exports.topicValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().required(),
    topic_title: Joi.string().min(3).max(100).required(),
    topic_text: Joi.string().min(5).required(),
    is_checked: Joi.boolean().optional(),
    is_approved: Joi.boolean().optional(),
    expert_id: Joi.string().optional(),
  });

  return schema.validate(body);
};
