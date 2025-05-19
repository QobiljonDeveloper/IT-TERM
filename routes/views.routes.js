const { createViewPage } = require("../helpers/create_view_page");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/dictionary", (req, res) => {
  res.render(createViewPage("dictionary"), {
    title: "Lug'atlar sahifa",
    isDictionary: true,
  });
});

router.get("/authors", (req, res) => {
  res.render(createViewPage("authors"), {
    title: "Mualliflar sahifa",
    isAuthors: true,
  });
});

router.get("/topics", (req, res) => {
  res.render(createViewPage("topics"), {
    title: "Maqolalar sahifa",
    isTopics: true,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login sahifa",
    isLogin: true,
  });
});

module.exports = router;
