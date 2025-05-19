const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const indexRouter = require("../routes/index.routes.js");
const errorHandlingMiddleware = require("../middlewares/errors/error.handling.middleware.js");
const logger = require("../services/logger.service.js");
const requestLogger = require("../middlewares/loggers/request.logger.js");
const requestErrorLogger = require("../middlewares/loggers/request.error.logger.js");
const PORT = config.get("port") || 3030;

//const
const winston = require("winston");
const expressWinston = require("express-winston");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret_token);
// console.log(config.get("secret_token"));

// logger.log("info", "oddiy LOG ma'lumoti");
// logger.error("Error LOG ma'lumoti");
// logger.debug("Debug LOG ma'lumoti");
// logger.warn("Warn LOG ma'lumoti");
// logger.info("Info LOG ma'lumoti");
// console.trace("Trace LOG ma'lumoti");
// console.table(["JS", "Python", "Java"]);
// console.table([
//   ["Karim", 5],
//   ["Vali", 2],
//   ["Ali", 3],
// ]);

process.on("uncaughtException", (exception) => {
  console.log("uncaughtException:", exception.message);
});

process.on("unhandledRejection", (rejection) => {
  console.log("unhandledRejection:", rejection);
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api", indexRouter);

app.use(requestErrorLogger);

app.use(errorHandlingMiddleware); // error handling eng oxiridda yozilishi kerak
async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`SERVER STARTED AT:http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
