const express = require("express");
const router = express.Router();
const kitchenController = require("../controllers/kitchenController");

// Retrieve groceries in the kitchen for a specific flat
router.get("/:flatId", kitchenController.getKitchenGroceries);

// Add a grocery item to the kitchen
router.post("/:flatId", kitchenController.addGroceryToKitchen);

// Update a grocery item in the kitchen
router.put("/:flatId/:groceryId", kitchenController.updateGroceryInKitchen);

// Remove a grocery item from the kitchen
router.delete(
  "/:flatId/:groceryId",
  kitchenController.removeGroceryFromKitchen
);

module.exports = router;
