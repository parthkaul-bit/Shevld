const groceryListService = require("../services/groceryListService");

exports.getGroceryList = async (req, res) => {
  try {
    const groceryList = await groceryListService.getGroceryList(
      req.params.flatId
    );
    res.status(200).json(groceryList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addItemToGroceryList = async (req, res) => {
  try {
    const groceryItem = await groceryListService.addItemToGroceryList(
      req.params.flatId,
      req.body
    );
    res.status(201).json(groceryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGroceryListItem = async (req, res) => {
  try {
    const updatedItem = await groceryListService.updateGroceryListItem(
      req.params.flatId,
      req.params.groceryId,
      req.body
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGroceryListItem = async (req, res) => {
  try {
    await groceryListService.deleteGroceryListItem(
      req.params.flatId,
      req.params.groceryId
    );
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
