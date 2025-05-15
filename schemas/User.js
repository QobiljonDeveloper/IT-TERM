const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
    is_active: { type: Boolean, default: true },
    refresh_token: { type: String },
    activation_link: { type: String },
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("User", userSchema);
