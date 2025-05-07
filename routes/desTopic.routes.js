const router = require("express").Router();
const { addDescTopic } = require("../controllers/descTopic.controller");

router.post("/", addDescTopic);

module.exports = router;
