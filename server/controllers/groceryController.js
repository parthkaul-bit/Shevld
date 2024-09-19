const groceryService = require("../services/groceryService");

exports.getAllGroceries = async (req, res) => {
  try {
    const groceries = await groceryService.getAllGroceries();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addGrocery = async (req, res) => {
  const { name, purchaseDate, shelfLife } = req.body;

  try {
    const newGrocery = await groceryService.addGrocery({
      name,
      purchaseDate,
      shelfLife,
    });
    res.status(201).json(newGrocery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGroceryById = async (req, res) => {
  const { id } = req.params;

  try {
    const grocery = await groceryService.getGroceryById(id);
    if (!grocery) {
      return res.status(404).json({ message: "Grocery item not found" });
    }
    res.json(grocery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
