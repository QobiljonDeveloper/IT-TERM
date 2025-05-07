const router = require("express").Router();
const dictRouter = require("./dict.routes");
const categoryRouter = require("./category.routes");
const authorRouter = require("./author.routes");
const descRouter = require("./description.routes");
const socialRouter = require("./social.routes");
const synonimRouter = require("./synonim.routes");

router.use("/dict", dictRouter);
router.use("/category", categoryRouter);
router.use("/author", authorRouter);
router.use("/description", descRouter);
router.use("/social", socialRouter);
router.use("/synonim", synonimRouter);

module.exports = router;
