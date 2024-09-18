const User = require("../models/userModel");

// Find a user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Create a new user
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { findUserByEmail, createUser, findUserById };
