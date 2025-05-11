const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (req.params.id != req.admin.id) {
      return res.status(403).send({
        message:
          "Ruxsat etilmagan foydalanuvchi. Faqat o'z ma'lumotini ko'rishi mumkin",
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
