const {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");

const router = require("express").Router();

router.post("/", addAuthor);
router.get("/", getAllAuthors);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:id", getOneAuthor);

module.exports = router;
