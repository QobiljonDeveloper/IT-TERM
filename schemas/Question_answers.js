const { Schema, model } = require("mongoose");

const questionAnswersSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
    },
    is_checked: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },  
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("QuestionAnswers", questionAnswersSchema);
