const authService = require("../services/authService");
const { validationResult } = require("express-validator");

// Sign up
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    const newUser = await authService.signupUser(email, password, name);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.loginUser(email, password);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
