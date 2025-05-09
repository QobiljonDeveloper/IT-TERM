const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .send({ message: "Authorization header topilmadi" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Noto‘g‘ri token format" });
    }

    const decodedPayload = jwt.verify(token, config.get("tokenKey"));

    if (!decodedPayload.is_active) {
      return res.status(403).send({ message: "Aktiv bo'lmagan foydalanuvchi" });
    }

    req.author = decodedPayload;
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
