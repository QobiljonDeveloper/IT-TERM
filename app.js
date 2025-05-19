const express = require("express");
const config = require("config");
const mongoose = require("mongoose"); // ODM
const cookieParser = require("cookie-parser");

const exHbs = require("express-handlebars");

const indexRouter = require("./routes/index.routes.js");
const viewRouter = require("./routes/views.routes.js");
const errorHandlingMiddleware = require("./middlewares/errors/error.handling.middleware.js");
const PORT = config.get("port") || 3030;

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json()); // parse qilib beradi jsondan obj ga
app.use(cookieParser());

const  hbs = exHbs.create({
    defaultLayout: "main",
    extname: "hbs",
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("views"));

app.use("/", viewRouter);// FRONTEND
app.use("/api", indexRouter);// BACKEND
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
