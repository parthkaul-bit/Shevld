const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  groceryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grocery",
    required: true,
  },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grocery", grocerySchema);
