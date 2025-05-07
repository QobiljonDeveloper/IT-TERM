const {
  addSocial,
  getAllSocails,
  updateSocial,
  getOneSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = require("express").Router();

router.post("/", addSocial);
router.get("/", getAllSocails);
router.patch("/:id", updateSocial);
router.delete("/:id", deleteSocial);
router.get("/:id", getOneSocial);

module.exports = router;
