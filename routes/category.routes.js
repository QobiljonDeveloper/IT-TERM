const {
  addCategory,
  getAllCategory,
  getCategoryByName,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addCategory);
router.get("/", getAllCategory);
router.get("/name-category", getCategoryByName);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getOneCategory);

module.exports = router;
