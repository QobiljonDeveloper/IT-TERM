const { addDescQA } = require("../controllers/desc_qa.controller");

const router = require("express").Router();

router.post("/", addDescQA);

module.exports = router;
