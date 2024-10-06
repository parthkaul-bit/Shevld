const User = require("../models/userModel");
const Flat = require("../models/flatModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (email, password, name) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 12);

  const newFlat = new Flat({
    name: `${name}'s Flat`,
    members: [],
  });

  await newFlat.save();

  const newUser = new User({
    email,
    passwordHash: hashedPassword,
    name,
    flatId: newFlat._id,
  });

  await newUser.save();
  return newUser;
};

// Function to log in a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
};

module.exports = { signupUser, loginUser };
