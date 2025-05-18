const Joi = require("joi");

exports.authorSocialValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().required(),
    social_id: Joi.string().required(),
    social_link: Joi.string().default("https://instagram.com/username"),
  });

  return schema.validate(body);
};
