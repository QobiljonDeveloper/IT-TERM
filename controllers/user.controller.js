const User = require("../schemas/User");
const { userValidation } = require("../validation/user.validation");
const { sendErrorResponse } = require("../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const { userJwtService } = require("../services/jwt.service");

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) return sendErrorResponse(error, res);

    value.password = await bcrypt.hash(value.password, 10);

    const newUser = await User.create(value);
    res.status(201).send({ message: "New user added", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = userValidation(req.body);
    if (error) return sendErrorResponse(error, res);

    const updatedUser = await User.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated user", updatedUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted user" });
  } catch (error) {
    sendErrorResponse(error, res);
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

    tokens = userJwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("user_refresh_key", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(200).send({
      message: "Logged in successfully",
      id: user._id,
      access_token: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { user_refresh_key } = req.cookies;

    if (!user_refresh_key) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const user = await User.findOneAndUpdate(
      {
        refresh_token: user_refresh_key,
      },
      {
        refresh_token: "",
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("user_refresh_key");
    res.send({ user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
