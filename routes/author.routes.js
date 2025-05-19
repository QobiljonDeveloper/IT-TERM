const {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
} = require("../controllers/author.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");
const authorSelfGuard = require("../middlewares/guards/author-self.guard");

const router = require("express").Router();

router.post("/", addAuthor);
router.post("/login", loginAuthor);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshAuthorToken);
router.get("/", getAllAuthors);
router.get("/activate/:link", authorActivate);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:id", authorJwtGuard, authorSelfGuard, getOneAuthor);

module.exports = router;
