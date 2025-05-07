const { Schema, model } = require("mongoose");

const descriptionSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Description", descriptionSchema);
