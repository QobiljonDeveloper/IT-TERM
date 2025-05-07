const {
  addDescription,
  getAllDescriptions,
  getOneDescription,
  updateDescription,
  deleteDescription,
} = require("../controllers/description.controller");

const router = require("express").Router();

router.post("/", addDescription);
router.get("/", getAllDescriptions);
router.patch("/:id", updateDescription);
router.delete("/:id", deleteDescription);
router.get("/:id", getOneDescription);

module.exports = router;
