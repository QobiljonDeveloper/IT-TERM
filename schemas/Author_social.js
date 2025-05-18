const { Schema, model } = require("mongoose");

const authorSocialSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    social_id: {
      type: Schema.Types.ObjectId,
      ref: "Social",
    },
    social_link: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("AuthorSocial", authorSocialSchema);
