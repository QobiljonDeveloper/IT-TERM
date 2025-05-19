const { createViewPage } = require("../helpers/create_view_page");
const topicsModel = require("../schemas/Topic");
const authorsModel = require("../schemas/Author");
const dictModel = require("../schemas/Dict");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/dictionary", async (req, res) => {
  let dict = await dictModel.find().lean();

  res.render(createViewPage("dictionary"), {
    title: "Lug'atlar sahifa",
    isDictionary: true,
    dict,
  });
});

router.get("/authors", async (req, res) => {
  let authors = await authorsModel.find().lean();
  console.log(authors);
  res.render(createViewPage("authors"), {
    title: "Mualliflar sahifa",
    isAuthors: true,
    authors,
  });
});

router.get("/topics", async (req, res) => {
  let topics = await topicsModel.find().lean();
  res.render(createViewPage("topics"), {
    isTopics: true,
    title: "Mavzular sahifasi",
    topics,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login sahifa",
    isLogin: true,
  });
});

module.exports = router;
