const express = require("express");
const router = express.Router();
const {
  addAdmin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");

router.post("/", addAdmin);
router.post("/login", loginAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getOneAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
