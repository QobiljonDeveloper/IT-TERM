const { sendErrorResponse } = require("../helpers/send_error_response");
const AuthorSocial = require("../schemas/Author_social");
const {
  authorSocialValidation,
} = require("../validation/author_social.validation");

const addAuthorSocial = async (req, res) => {
  try {
    const { error, value } = authorSocialValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const { author_id, social_id, social_link } = value;
    const newAuthorSocial = await AuthorSocial.create({
      author_id,
      social_id,
      social_link,
    });
    res
      .status(201)
      .send({ message: "New Author Social added", newAuthorSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAuthorSocial = async (req, res) => {
  try {
    const authorSocials = await AuthorSocial.find();
    res.status(200).send({ authorSocials });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAuthorSocialByName = async (req, res) => {
  const { name } = req.body;
  try {
    const findName = await AuthorSocial.find({ name });
    res.status(200).send({ findName });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneAuthorSocial = async (req, res) => {
  const { id } = req.params;
  try {
    const authorSocial = await AuthorSocial.findById(id);
    res.status(200).send({ authorSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAuthorSocial = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = authorSocialValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const updateAuthorSocial = await AuthorSocial.findByIdAndUpdate(id, value, {
      new: true,
    });
    res
      .status(200)
      .send({ message: "Updated Author Social", updateAuthorSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAuthorSocial = async (req, res) => {
  const { id } = req.params;
  try {
    await AuthorSocial.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Author Social" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
module.exports = {
  addAuthorSocial,
  getAllAuthorSocial,
  getAuthorSocialByName,
  getOneAuthorSocial,
  updateAuthorSocial,
  deleteAuthorSocial,
};
