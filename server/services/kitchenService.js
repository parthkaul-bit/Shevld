const kitchenRepository = require("../repositories/kitchenRepository");
const groceryRepository = require("../repositories/groceryRepository");
const Kitchen = require("../models/kitchenModel");
const Grocery = require("../models/groceryModel");

// Get groceries in the kitchen for a specific flat
const getKitchenGroceries = async (flatId) => {
  const kitchen = await kitchenRepository.findKitchenByFlatId(flatId);
  return kitchen ? kitchen.groceries : [];
};

// Add a grocery item to the kitchen
const addGroceryToKitchen = async (
  flatId,
  { groceryId, quantity, addedBy }
) => {
  const grocery = await groceryRepository.findGroceryById(groceryId);

  if (!grocery) {
    throw new Error("Grocery item not found");
  }

  const expirationDate = new Date(grocery.purchaseDate);
  expirationDate.setDate(expirationDate.getDate() + grocery.shelfLife);

  return await kitchenRepository.addGroceryToKitchen(flatId, {
    groceryId,
    quantity,
    expirationDate,
    imageUrl: grocery.imageUrl,
    addedBy,
    addedAt: new Date(),
  });
};

const updateGroceryInKitchen = async (flatId, groceryId, updateData) => {
  try {
    const kitchen = await Kitchen.findOne({
      flatId,
      "groceries.groceryId": groceryId,
    });

    if (!kitchen) {
      throw new Error("Grocery item not found in kitchen.");
    }

    const groceryDetails = await Grocery.findById(groceryId);
    if (!groceryDetails) {
      throw new Error("Grocery details not found.");
    }

    const groceryItem = kitchen.groceries.find(
      (item) => item.groceryId.toString() === groceryId
    );

    if (!groceryItem) {
      throw new Error("Grocery item not found in kitchen.");
    }

    groceryItem.quantity = updateData.quantity || groceryItem.quantity;
    groceryItem.imageUrl = groceryDetails.imageUrl;
    groceryItem.expirationDate = new Date(
      Date.now() + groceryDetails.shelfLife * 24 * 60 * 60 * 1000
    );

    await kitchen.save();

    return groceryItem;
  } catch (error) {
    throw error;
  }
};

// Remove a grocery item from the kitchen
const removeGroceryFromKitchen = async (flatId, groceryId) => {
  return await kitchenRepository.removeGroceryFromKitchen(flatId, groceryId);
};

module.exports = {
  getKitchenGroceries,
  addGroceryToKitchen,
  updateGroceryInKitchen,
  removeGroceryFromKitchen,
};
