const { sendErrorResponse } = require("../helpers/send_error_response");
const Tag = require("../schemas/Tag");
const { tagValidation } = require("../validation/tag.validation");

const addTag = async (req, res) => {
  try {
    const { error, value } = tagValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }

    const newTag = await Tag.create(value);
    res.status(201).send({ message: "New Tag added", newTag });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = { addTag };
