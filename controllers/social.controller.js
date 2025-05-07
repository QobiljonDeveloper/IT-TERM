const { sendErrorResponse } = require("../helpers/send_error_response");
const Social = require("../schemas/Social");
const { socailValidation } = require("../validation/social.validation");

const addSocial = async (req, res) => {
  try {
    const { error, value } = socailValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }
    const newSocial = await Social.create(value);
    res.status(201).send({ message: "New Social added", newSocial });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllSocails = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).send({ socials });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneSocial = async (req, res) => {
  const { id } = req.params;
  try {
    const social = await Social.findById(id);
    res.status(200).send({ social });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateSocial = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = socailValidation(req.body);

    if (error) {
      return sendErrorResponse(res, error);
    }
    const newSocial = await Social.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(201).send({ message: "New Social added", newSocial });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteSocial = async (req, res) => {
  const { id } = req.params;
  try {
    await Social.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Social" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
module.exports = {
  addSocial,
  getAllSocails,
  updateSocial,
  getOneSocial,
  deleteSocial,
};
