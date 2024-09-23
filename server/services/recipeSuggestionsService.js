const Grocery = require("../models/groceryModel");
const fetch = require("node-fetch");

const getRecipeSuggestions = async (groceryId) => {
  const grocery = await Grocery.findById(groceryId);

  if (!grocery) {
    throw new Error("Grocery item not found");
  }

  // If the grocery is close to expiration, fetch recipes from Tasty API
  const today = new Date();
  const daysLeft = Math.floor(
    (grocery.expirationDate - today) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft > 2) {
    return { message: "This item is not close to expiration." };
  }

  // Use the grocery name to search for recipes from the Tasty API
  const query = grocery.name;
  const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${encodeURIComponent(
    query
  )}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipes = result.results.map((recipe) => ({
      name: recipe.name,
      description: recipe.description,
      prep_time: recipe.prep_time_minutes,
      cook_time: recipe.cook_time_minutes,
      total_time: recipe.total_time_minutes,
      servings: recipe.num_servings,
      imageUrl: recipe.thumbnail_url,
      videoUrl: recipe.video_url,
      instructions: recipe.instructions.map((instr) => instr.display_text),
    }));

    return recipes;
  } catch (error) {
    console.error("Error fetching recipe suggestions:", error);
    throw new Error("Failed to fetch recipe suggestions.");
  }
};

module.exports = { getRecipeSuggestions };
