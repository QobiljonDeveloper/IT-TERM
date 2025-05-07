const { addTag } = require("../controllers/tag.controller");

const router = require("express").Router();

router.post("/", addTag);

module.exports = router;
