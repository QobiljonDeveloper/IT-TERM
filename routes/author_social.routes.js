const {
  addAuthorSocial,
  getAllAuthorSocial,
  getOneAuthorSocial,
  updateAuthorSocial,
  deleteAuthorSocial,
} = require("../controllers/author_socail.controller");

const router = require("express").Router();

router.post("/", addAuthorSocial);
router.get("/", getAllAuthorSocial);
router.patch("/:id", updateAuthorSocial);
router.delete("/:id", deleteAuthorSocial);
router.get("/:id", getOneAuthorSocial);

module.exports = router;
