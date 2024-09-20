const kitchenService = require("../services/kitchenService");

exports.getKitchenGroceries = async (req, res) => {
  const { flatId } = req.params;

  try {
    const groceries = await kitchenService.getKitchenGroceries(flatId);
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addGroceryToKitchen = async (req, res) => {
  const { flatId } = req.params;
  const { groceryId, quantity, addedBy } = req.body;

  try {
    const newGrocery = await kitchenService.addGroceryToKitchen(flatId, {
      groceryId,
      quantity,
      addedBy,
    });
    res.status(201).json(newGrocery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGroceryInKitchen = async (req, res) => {
  const { flatId, groceryId } = req.params;
  const updateData = req.body;

  try {
    const updatedGrocery = await kitchenService.updateGroceryInKitchen(
      flatId,
      groceryId,
      updateData
    );
    if (!updatedGrocery) {
      return res.status(404).json({ message: "Grocery item not found" });
    }
    res.json(updatedGrocery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeGroceryFromKitchen = async (req, res) => {
  const { flatId, groceryId } = req.params;

  try {
    await kitchenService.removeGroceryFromKitchen(flatId, groceryId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
