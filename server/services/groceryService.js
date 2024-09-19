const groceryRepository = require("../repositories/groceryRepository");
const fetch = require("node-fetch"); // To interact with Unsplash API

// Get image URL from Unsplash
const getImageUrl = async (groceryName) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${groceryName}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await response.json();
  return data.urls.small;
};

// Retrieve a list of groceries
const getAllGroceries = async () => {
  return await groceryRepository.findAllGroceries();
};

// Add a new grocery item
const addGrocery = async (groceryData) => {
  const { name, shelfLife, purchaseDate } = groceryData;
  const imageUrl = await getImageUrl(name);

  const newGroceryData = {
    ...groceryData,
    imageUrl,
    shelfLife,
    purchaseDate,
  };

  return await groceryRepository.createGrocery(newGroceryData);
};

// Retrieve a specific grocery item by ID
const getGroceryById = async (id) => {
  return await groceryRepository.findGroceryById(id);
};

module.exports = { getAllGroceries, addGrocery, getGroceryById };
