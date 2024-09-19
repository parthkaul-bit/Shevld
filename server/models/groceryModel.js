const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  shelfLife: { type: Number, required: true, default: 7 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grocery", grocerySchema);
