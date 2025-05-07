const {
  addAuthor,
  getAllAuthors,
} = require("../controllers/author.controller");

const router = require("express").Router();

router.post("/", addAuthor);
router.get("/", getAllAuthors);

module.exports = router;
