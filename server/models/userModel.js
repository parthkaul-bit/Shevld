const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flat",
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
