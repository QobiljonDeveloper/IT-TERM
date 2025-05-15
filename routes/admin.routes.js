const express = require("express");
const router = express.Router();
const {
  addAdmin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin.controller");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard");
const adminCreatorGuard = require("../middlewares/guards/admin-creator.guard");
const adminSelfGuard = require("../middlewares/guards/admin.self.guard");

router.post("/", addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/", adminJwtGuard, adminCreatorGuard, getAllAdmins);
router.get("/:id", adminJwtGuard, adminSelfGuard, getOneAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
