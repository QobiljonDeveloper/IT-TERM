const {
  addTopic,
  getAllTopics,
  updateTopic,
  getOneTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

const router = require("express").Router();

router.post("/", addTopic);
router.get("/", getAllTopics);
router.patch("/:id", updateTopic);
router.delete("/:id", deleteTopic);
router.get("/:id", getOneTopic);

module.exports = router;
