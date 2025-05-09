const {
  addDict,
  getAllDict,
  getOneDict,
  getDictByTerm,
  getDictByLetter,
  deleteDict,
  updateDict,
} = require("../controllers/dict.controller");
const authorExpertGuard = require("../middlewares/guards/author-expert.guard");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.get("/", getAllDict);
router.post("/", authorJwtGuard , authorExpertGuard, addDict);
router.post("/term", getDictByTerm);
router.post("/letter", getDictByLetter);
router.get("/:id", getOneDict);
router.delete("/:id", deleteDict);
router.patch("/:id", updateDict);

module.exports = router;
