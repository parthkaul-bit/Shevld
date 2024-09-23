const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/suggestions/:groceryId", recipeController.getRecipeSuggestions);

module.exports = router;
