const mongoose = require("mongoose");

const collaborativeKitchenSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", required: true },
  groceries: [
    {
      groceryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grocery",
        required: true,
      },
      quantity: { type: Number, required: true },
      expirationDate: { type: Date, required: true },
      imageUrl: { type: String },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "CollaborativeKitchen",
  collaborativeKitchenSchema
);
