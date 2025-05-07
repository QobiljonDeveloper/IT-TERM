const { Schema, model } = require("mongoose");

const synonimSchema = new Schema(
  {
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Desription",
    },
    dict_id: {
      type: Schema.Types.ObjectId,
      ref: "Dictionary",
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Synonim", synonimSchema);
