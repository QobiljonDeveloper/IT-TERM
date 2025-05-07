const { sendErrorResponse } = require("../helpers/send_error_response");
const DescTopic = require("../schemas/DescTopic");
const { descTopicValidation } = require("../validation/destopic.validation");

const addDescTopic = async (req, res) => {
  try {
    const { error, value } = descTopicValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }

    const newDescTopic = await DescTopic.create(value);
    res.status(201).send({ message: "New Desc_Topic added", newDescTopic });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = { addDescTopic };
