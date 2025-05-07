const Topic = require("../schemas/Topic");
const { topicValidation } = require("../validation/topic.validation");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addTopic = async (req, res) => {
  try {
    const { error, value } = topicValidation(req.body);

    if (error) return sendErrorResponse(res, error);

    const newTopic = await Topic.create(value);
    res.status(201).send({ message: "New Topic added", newTopic });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("author_id", "first_name last_name")
      .populate("expert_id", "first_name last_name");
    res.status(200).send({ topics });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findById(id)
      .populate("author_id", "first_name last_name")
      .populate("expert_id", "first_name last_name");
    res.status(200).send({ topic });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = topicValidation(req.body);

    if (error) return sendErrorResponse(res, error);

    const updatedTopic = await Topic.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated Topic", updatedTopic });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteTopic = async (req, res) => {
  const { id } = req.params;
  try {
    await Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Topic" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addTopic,
  getAllTopics,
  getOneTopic,
  updateTopic,
  deleteTopic,
};
