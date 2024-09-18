const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  purchaseDate: { type: Date, required: true },
  shelfLife: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grocery", grocerySchema);
