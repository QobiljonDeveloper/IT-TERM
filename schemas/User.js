const { required } = require("joi");
const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
  {
    user_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lower,
    },
    password: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    user_photo: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Social", socialSchema);
