const Grocery = require("../models/groceryModel");

// Get all groceries
const findAllGroceries = async () => {
  return await Grocery.find();
};

// Add a new grocery item
const createGrocery = async (groceryData) => {
  const grocery = new Grocery(groceryData);
  return await grocery.save();
};

// Get a grocery by ID
const findGroceryById = async (id) => {
  return await Grocery.findById(id);
};

module.exports = { findAllGroceries, createGrocery, findGroceryById };
