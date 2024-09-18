const userService = require("../services/userService");

exports.getUserById = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await userService.getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
