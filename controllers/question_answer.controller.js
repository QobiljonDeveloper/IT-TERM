const QuestionAnswers = require("../schemas/Question_answers");
const { qaValidation } = require("../validation/question_answer.validation");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addQA = async (req, res) => {
  try {
    const { error, value } = qaValidation(req.body);         

    if (error) return sendErrorResponse(error, res);

    const newQA = await QuestionAnswers.create(value);
    res.status(201).send({ message: "New QA added", newQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllQA = async (req, res) => {
  try {
    const qa = await QuestionAnswers.find()
      .populate("user_id", "user_name")
      .populate("expert_id", "first_name last_name");
    res.status(200).send({ qa });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneQA = async (req, res) => {
  const { id } = req.params;
  try {
    const qa = await QuestionAnswers.findById(id)
      .populate("user_id", "user_name")
      .populate("expert_id", "first_name last_name");
    res.status(200).send({ qa });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateQA = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = qaValidation(req.body);

    if (error) return sendErrorResponse(error, res);

    const updatedQA = await QuestionAnswers.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated QA", updatedQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteQA = async (req, res) => {
  const { id } = req.params;
  try {
    await QuestionAnswers.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted QA" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addQA,
  getAllQA,
  getOneQA,
  updateQA,
  deleteQA,
};
