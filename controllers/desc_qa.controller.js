const { sendErrorResponse } = require("../helpers/send_error_response");
const DescQA = require("../schemas/Desc_qa");

const addDescQA = async (req, res) => {
  try {
    const { qa_id, desc_id } = req.body;
    const newDescQA = await DescQA.create({ qa_id, desc_id });
    res.status(201).send({ message: "New DescQA added", newDescQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDescQA,
};
