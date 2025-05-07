const { sendErrorResponse } = require("../helpers/send_error_response");
const Dict = require("../schemas/Dict");
const { dictValidation } = require("../validation/dict.validation");

const addDict = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }
    const { term } = value;
    const newDict = await Dict.create({ term, letter: term[0] });
    res.status(201).send({ message: "New Term added", newDict });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllDict = async (req, res) => {
  try {
    const terms = await Dict.find();
    res.status(200).send({ terms });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getDictByTerm = async (req, res) => {
  const { term } = req.body;
  try {
    const findTerm = await Dict.find({ term });
    res.status(200).send({ findTerm });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getDictByLetter = async (req, res) => {
  const { letter } = req.body;
  try {
    const findLetter = await Dict.find({ letter });
    res.status(200).send({ findLetter });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneDict = async (req, res) => {
  const { id } = req.params;
  try {
    const term = await Dict.findById(id);
    res.status(200).send({ term });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateDict = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = dictValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }
    const updateDict = await Dict.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated Dict", updateDict });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteDict = async (req, res) => {
  const { id } = req.params;
  try {
    await Dict.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Dict" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
module.exports = {
  addDict,
  getAllDict,
  getOneDict,
  getDictByTerm,
  getDictByLetter,
  deleteDict,
  updateDict,
};
