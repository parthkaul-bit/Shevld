const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  groceryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grocery",
    required: true,
  },
  quantity: { type: Number, required: true },
  expirationDate: {
    type: Date,
    required: true,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      return currentDate;
    },
  },
  imageUrl: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addedAt: { type: Date, default: Date.now },
});

const kitchenSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, required: true },
  groceries: [grocerySchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Kitchen", kitchenSchema);
