const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  userActivate,
} = require("../controllers/user.controller");
const userJwtGuard = require("../middlewares/guards/user-jwt.guard");
const userSelfGuard = require("../middlewares/guards/user-self.guard");

router.post("/", addUser);
router.get("/", userJwtGuard, getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserToken);
router.get("/activate/:link", userActivate);
router.get("/:id", userJwtGuard, userSelfGuard, getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
