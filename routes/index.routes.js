const router = require("express").Router();
const dictRouter = require("./dict.routes");
const categoryRouter = require("./category.routes");
const authorRouter = require("./author.routes");
const descRouter = require("./description.routes");
const socialRouter = require("./social.routes");
const synonimRouter = require("./synonim.routes");
const topicRouter = require("./topic.routes");
const descTopicRouter = require("./desTopic.routes");
const tagRouter = require("./tag.routes");

router.use("/dict", dictRouter);
router.use("/category", categoryRouter);
router.use("/author", authorRouter);
router.use("/description", descRouter);
router.use("/synonim", synonimRouter);
router.use("/social", socialRouter);
router.use("/topic", topicRouter);
router.use("/desc-topic", descTopicRouter);
router.use("/tag", tagRouter);

module.exports = router;
