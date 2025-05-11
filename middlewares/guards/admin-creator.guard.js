const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (!req.admin.admin_is_creator) {
      return res.status(403).send({
        message: "Ruxsat etilmagan foydalanuvchi. Siz Creator emassiz",
      });
    }

    console.log(req.admin);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
