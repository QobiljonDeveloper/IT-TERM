const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller");

router.post("/", addUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
