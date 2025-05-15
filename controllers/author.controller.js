const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwtService = require("../services/jwt.service");
const { authorJwtService } = require("../services/jwt.service");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
      activation_link,
      activation_link,
    });
    const link = `${config.get(
      "api_url"
    )}/api/author/activate/${activation_link}`;
    await mailService.sendMail(value.email, link);
    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).send({ authors });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOneAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated Author", updatedAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted Author" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    // * identifikation
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    // ** auth
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.authorJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    // ---------------------TEST UCHUN ERROR--------------------------
    setTimeout(function () {
      try {
        throw new Error("Caught inside setTimeout");
      } catch (error) {
        console.log("Xato ushlangan:", error.message);
      }
    }, 100);

    new Promise((_, reject) => {
      reject(new Error("UnhandledRejection example"));
    });
    // ---------------------TEST UCHUN ERROR--------------------------
    res.status(201).send({
      message: "Tizimga kirdingiz",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const author = await Author.findOneAndUpdate(
      {
        refresh_token: refreshToken,
      },
      {
        refresh_token: "",
      },
      {
        new: true,
      }
    );

    if (!author) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    await authorJwtService.verifyRefreshToken(refreshToken);

    const author = await Author.findOne({ refresh_token: refreshToken });

    if (!author) {
      return res
        .status(401)
        .send({ message: "Bazada refresh token topilmadi" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };

    const tokens = authorJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const authorActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const author = await Author.findOne({ activation_link: link });

    if (!author) {
      return res.status(400).send({ message: "Avtor link noto'g'ri" });
    }

    if (author.is_active) {
      return res.status(400).send({ message: "Avtor avvlar faollashtirilgan" });
    }

    author.is_active = true;
    await author.save();

    res.send({ message: "Avtor faollashtirildi", isActive: author.is_active });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
};
