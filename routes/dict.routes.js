const {
  addDict,
  getAllDict,
  getOneDict,
  getDictByTerm,
  getDictByLetter,
  deleteDict,
  updateDict,
} = require("../controllers/dict.controller");

const router = require("express").Router();

router.get("/", getAllDict);
router.post("/", addDict);
router.post("/term", getDictByTerm);
router.post("/letter", getDictByLetter);
router.get("/:id", getOneDict);
router.delete("/:id", deleteDict);
router.patch("/:id", updateDict);

module.exports = router;
