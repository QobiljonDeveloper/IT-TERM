const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (!req.author.is_expert) {
      return res.status(403).send({
        message: "Ruxsat etilmagan foydalanuvchi. Siz Expert emassiz",
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
