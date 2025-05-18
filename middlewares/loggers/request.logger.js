const expressWinston = require("express-winston");
const winston = require("winston");
require("winston-mongodb");

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/itterm",
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) {
    return false;
  },
});
