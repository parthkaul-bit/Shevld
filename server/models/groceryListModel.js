const mongoose = require("mongoose");

const groceryListSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      status: {
        type: String,
        enum: ["pending", "purchased"],
        default: "pending",
      },
      addedAt: { type: Date, default: Date.now },
      purchasedAt: { type: Date },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GroceryList", groceryListSchema);
