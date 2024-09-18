const userRepository = require("../repositories/userRepository");

// Get user by ID
const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = { getUserById };
