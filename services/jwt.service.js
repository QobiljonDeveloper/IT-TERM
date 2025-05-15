const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accsesKey, refreshKey, accsesTime, refreshTime) {
    this.accsesKey = accsesKey;
    this.refreshKey = refreshKey;
    this.accsesTime = accsesTime;
    this.refreshTime = refreshTime;
  }
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accsesKey, {
      expiresIn: this.accsesTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accsesKey);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

const authorJwtService = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

const adminJwtService = new JwtService(
  config.get("admin_access_key"),
  config.get("admin_refresh_key"),
  config.get("admin_access_time"),
  config.get("refresh_time")
);

const userJwtService = new JwtService(
  config.get("user_access_key"),
  config.get("user_refresh_key"),
  config.get("user_access_time"),
  config.get("refresh_time")
);

module.exports = {
  adminJwtService,
  authorJwtService,
  userJwtService,
};
