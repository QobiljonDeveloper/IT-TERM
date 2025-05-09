const Admin = require("../schemas/Admin");
const { adminValidation } = require("../validation/admin-validation");
const { sendErrorResponse } = require("../helpers/send_error_response");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) return sendErrorResponse(res, error);

    value.admin_password = await bcrypt.hash(value.admin_password, 10);

    const newAdmin = await Admin.create(value);
    res.status(201).send({ message: "New admin added", newAdmin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({ admins });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOneAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    res.status(200).send({ admin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = adminValidation(req.body);
    if (error) return sendErrorResponse(res, error);

    const updatedAdmin = await Admin.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated admin", updatedAdmin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted admin" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const loginAdmin = async (req, res) => {
  const { admin_email, admin_password } = req.body;
  try {
    const admin = await Admin.findOne({ admin_email });
    if (!admin) return res.status(404).send({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) return res.status(400).send({ message: "Invalid password" });

    res.status(200).send({ message: "Admin logged in successfully", admin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
