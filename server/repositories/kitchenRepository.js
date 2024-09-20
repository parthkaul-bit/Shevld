const Kitchen = require("../models/kitchenModel");

// Get groceries in the kitchen for a specific flat
const findKitchenByFlatId = async (flatId) => {
  return await Kitchen.findOne({ flatId });
};

// Add a grocery item to the kitchen
const addGroceryToKitchen = async (flatId, groceryData) => {
  const kitchen = await findKitchenByFlatId(flatId);

  if (!kitchen) {
    const newKitchen = new Kitchen({ flatId, groceries: [groceryData] });
    return await newKitchen.save();
  }

  kitchen.groceries.push(groceryData);
  return await kitchen.save();
};

// Update a grocery item in the kitchen
const updateGroceryInKitchen = async (flatId, groceryId, updateData) => {
  const kitchen = await findKitchenByFlatId(flatId);

  if (!kitchen) return null;

  const groceryIndex = kitchen.groceries.findIndex(
    (g) => g._id.toString() === groceryId
  );
  if (groceryIndex === -1) return null;

  kitchen.groceries[groceryIndex] = {
    ...kitchen.groceries[groceryIndex],
    ...updateData,
  };
  return await kitchen.save();
};

// Remove a grocery item from the kitchen
const removeGroceryFromKitchen = async (flatId, groceryId) => {
  const kitchen = await findKitchenByFlatId(flatId);

  if (!kitchen) return;

  kitchen.groceries = kitchen.groceries.filter(
    (g) => g._id.toString() !== groceryId
  );
  await kitchen.save();
};

module.exports = {
  findKitchenByFlatId,
  addGroceryToKitchen,
  updateGroceryInKitchen,
  removeGroceryFromKitchen,
};
