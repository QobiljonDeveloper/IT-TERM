const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_name: { type: String, required: true },
    admin_email: { type: String, required: true, unique: true },
    admin_phone: { type: String, required: true },
    admin_password: { type: String, required: true },
    admin_is_active: { type: Boolean, default: true },
    admin_is_creator: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
  }
);

module.exports = mongoose.model("Admin", adminSchema);
