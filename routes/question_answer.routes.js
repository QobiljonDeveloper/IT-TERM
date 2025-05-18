const {
    addQA,
    getAllQA,
    updateQA,
    getOneQA,
    deleteQA,
  } = require("../controllers/question_answer.controller");
  
  const router = require("express").Router();
  
  router.post("/", addQA);
  router.get("/", getAllQA);
  router.patch("/:id", updateQA);
  router.delete("/:id", deleteQA);
  router.get("/:id", getOneQA);
  
  module.exports = router;
  