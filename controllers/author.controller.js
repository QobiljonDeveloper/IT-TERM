const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return sendErrorResponse(res, error);
    }

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

const getOneAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return sendErrorResponse(res, error);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated Author", updatedAuthor });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Author" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
