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

// Find a grocery item by its ID
const findGroceryById = async (groceryId) => {
  return await Grocery.findById(groceryId);
};

module.exports = { findAllGroceries, createGrocery, findGroceryById };
