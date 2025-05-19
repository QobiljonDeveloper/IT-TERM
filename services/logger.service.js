const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, colorize, json } =
  format;
const { MongoDB } = require("winston-mongodb");

const config = require("config");
const myFormat = printf(({ level, message, label }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    // colorize(),
    timestamp(),
    label({ label: "ITTERM" }),
    myFormat,
    // prettyPrint(), //   kerakli bo‘lsa
    json() // log fayl uchun alohida transportda ishlatish mumkin
  ),

  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log", level: "info" }),
    new transports.MongoDB({
      level: "error",
      db: config.get("dbUri"),
      collection: "logs",
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

logger.exitOnError = false;
logger.rejections = false;

module.exports = logger;

