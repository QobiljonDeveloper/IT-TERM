const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }
    //create
    const newAuthor = await Author.create(value);
    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).send({ authors });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getCategoryByName = async (req, res) => {
  const { name } = req.body;
  try {
    const findName = await Category.find({ name });
    res.status(200).send({ findName });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, data);
    res.status(200).send({ message: "Updated Category", updateCategory });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Category" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
module.exports = {
  addAuthor,
  getAllAuthors,
};
