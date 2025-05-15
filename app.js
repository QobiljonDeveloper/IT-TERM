const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.routes.js");
const errorHandlingMiddleware = require("./middlewares/errors/error.handling.middleware.js");

const PORT = config.get("port") || 3030;

process.on("uncaughtException", (exception) => {
  console.log("uncaughtException:", exception.message);
});

process.on("unhandledRejection", (rejection) => {
  console.log("unhandledRejection:", rejection);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);
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
