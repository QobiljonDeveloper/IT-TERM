const { Schema, model } = require("mongoose");

const descQASchema = new Schema(
  {
    qa_id: {
      type: Schema.Types.ObjectId,
      ref: "QuestionAnswers",
    },
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("DescQA", descQASchema);
