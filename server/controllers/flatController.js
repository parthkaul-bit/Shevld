const flatService = require("../services/flatService");

exports.createFlat = async (req, res) => {
  const { name, address } = req.body;
  try {
    const flat = await flatService.createFlat({ name, address });
    res.status(201).json(flat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUserToFlat = async (req, res) => {
  const { flatId } = req.params;
  const { userId } = req.body;
  try {
    const flat = await flatService.addUserToFlat(flatId, userId);
    res.status(200).json(flat);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.removeUserFromFlat = async (req, res) => {
  const { flatId } = req.params;
  const { userId } = req.body;
  try {
    const flat = await flatService.removeUserFromFlat(flatId, userId);
    res.status(200).json(flat);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
