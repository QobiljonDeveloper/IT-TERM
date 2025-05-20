const {
  addTopic,
  getAllTopics,
  updateTopic,
  getOneTopic,
  deleteTopic,
} = require("../controllers/topic.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/", addTopic);
router.get("/", authorJwtGuard, getAllTopics);
router.patch("/:id", updateTopic);
router.delete("/:id", deleteTopic);
router.get("/:id", getOneTopic);

module.exports = router;
