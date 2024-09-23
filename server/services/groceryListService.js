const groceryListRepository = require("../repositories/groceryListRepository");
const kitchenRepository = require("../repositories/kitchenRepository");

exports.getGroceryList = async (flatId) => {
  const groceryList = await groceryListRepository.findByFlatId(flatId);
  if (!groceryList) throw new Error("Grocery list not found.");
  return groceryList;
};

exports.addItemToGroceryList = async (flatId, itemData) => {
  let groceryList = await groceryListRepository.findByFlatId(flatId);
  if (!groceryList) {
    groceryList = await groceryListRepository.createGroceryList(flatId);
  }
  await groceryListRepository.addItem(flatId, itemData);
  return itemData;
};

exports.updateGroceryListItem = async (flatId, groceryId, updateData) => {
  const updatedItem = await groceryListRepository.updateItem(
    flatId,
    groceryId,
    updateData
  );
  if (!updatedItem) throw new Error("Grocery item not found.");
  return updatedItem.items.id(groceryId);
};

exports.deleteGroceryListItem = async (flatId, groceryId) => {
  const updatedList = await groceryListRepository.removeItem(flatId, groceryId);
  if (!updatedList) throw new Error("Grocery item not found.");
};
