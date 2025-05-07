const { addSynonim } = require("../controllers/synonim.controller");

const router = require("express").Router();

router.post("/", addSynonim);

module.exports = router;
