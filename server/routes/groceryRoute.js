const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

// Retrieve a list of groceries
router.get("/", groceryController.getAllGroceries);

// Add a new grocery item
router.post("/", groceryController.addGrocery);

// Retrieve a specific grocery item by ID
router.get("/:id", groceryController.getGroceryById);

module.exports = router;
