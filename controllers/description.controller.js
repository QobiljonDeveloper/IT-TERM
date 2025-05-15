const { sendErrorResponse } = require("../helpers/send_error_response");
const Description = require("../schemas/Description");
const {
  descriptionValidation,
} = require("../validation/description.validation");

const addDescription = async (req, res) => {
  try {
    const { error, value } = descriptionValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const { description } = value;
    const newDescription = await Description.create({ description });
    res.status(201).send({ message: "New Description added", newDescription });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.find().populate("category_id");
    res.status(200).send({ descriptions });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const description = await Description.findById(id).populate("category_id");
    res.status(200).send({ description });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = descriptionValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const updatedDescription = await Description.findByIdAndUpdate(id, value, {
      new: true,
    });
    res
      .status(200)
      .send({ message: "Updated Description", updatedDescription });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDescription = async (req, res) => {
  const { id } = req.params;
  try {
    await Description.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Description" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
module.exports = {
  addDescription,
  getAllDescriptions,
  getOneDescription,
  updateDescription,
  deleteDescription,
};
