const User = require("../schemas/User");
const { userValidation } = require("../validation/user.validation");
const { sendErrorResponse } = require("../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) return sendErrorResponse(res, error);

    value.password = await bcrypt.hash(value.password, 10);

    const newUser = await User.create(value);
    res.status(201).send({ message: "New user added", newUser });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = userValidation(req.body);
    if (error) return sendErrorResponse(res, error);

    const updatedUser = await User.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated user", updatedUser });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted user" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Invalid password" });

    const payload = {
      id: user._id,
      email: user.email,
      is_active: user.is_active,
    };

    token = jwt.sign(payload, config.get("tokenUserKey"), {
      expiresIn: config.get("tokenExpTime"),
    });
    res
      .status(200)
      .send({ message: "Logged in successfully", id: user._id, token });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
};
