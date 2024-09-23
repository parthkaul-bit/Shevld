const GroceryList = require("../models/groceryListModel");

exports.findByFlatId = async (flatId) => {
  return await GroceryList.findOne({ flatId });
};

exports.createGroceryList = async (flatId) => {
  const groceryList = new GroceryList({ flatId, items: [] });
  return await groceryList.save();
};

exports.addItem = async (flatId, itemData) => {
  const groceryList = await GroceryList.findOne({ flatId });
  groceryList.items.push(itemData);
  return await groceryList.save();
};

exports.updateItem = async (flatId, groceryId, updateData) => {
  return await GroceryList.findOneAndUpdate(
    { flatId, "items._id": groceryId },
    {
      $set: {
        "items.$.name": updateData.name,
        "items.$.quantity": updateData.quantity,
        "items.$.status": updateData.status,
        "items.$.purchasedAt":
          updateData.status === "purchased" ? Date.now() : null,
      },
    },
    { new: true }
  );
};

exports.removeItem = async (flatId, groceryId) => {
  return await GroceryList.findOneAndUpdate(
    { flatId },
    { $pull: { items: { _id: groceryId } } },
    { new: true }
  );
};
