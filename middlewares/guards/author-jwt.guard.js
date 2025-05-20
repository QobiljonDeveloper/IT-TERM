const { sendErrorResponse } = require("../../helpers/send_error_response");
const { authorJwtService } = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
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

    const decodedPayload = await authorJwtService.verifyAccessToken(token);

    if (!decodedPayload.is_active) {
      return res.status(403).send({ message: "Aktiv bo'lmagan foydalanuvchi" });
    }
    req.author = decodedPayload;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
