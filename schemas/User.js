const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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

module.exports = model("User", userSchema);
