const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../schemas/Category");
const { categoryValidation } = require("../validation/category.validation");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const { name, parent_category_id } = value;
    const newCategory = await Dict.create({ name, parent_category_id });
    res.status(201).send({ message: "New Category added", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ categories });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCategoryByName = async (req, res) => {
  const { name } = req.body;
  try {
    const findName = await Category.find({ name });
    res.status(200).send({ findName });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = categoryValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const updateCategory = await Category.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated Category", updateCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Category" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
module.exports = {
  addCategory,
  getAllCategory,
  getCategoryByName,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
