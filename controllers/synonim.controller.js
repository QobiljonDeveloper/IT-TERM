const { sendErrorResponse } = require("../helpers/send_error_response");
const Synonim = require("../schemas/Synonim");

const addSynonim = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    const newSynonim = await Synonim.create({ desc_id, dict_id });
    res.status(201).send({ message: "New Synonim added", newSynonim });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addSynonim,
};
