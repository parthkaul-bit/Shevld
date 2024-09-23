const express = require("express");
const router = express.Router();
const groceryListController = require("../controllers/groceryListController");

// Routes for grocery list operations
router.get("/:flatId", groceryListController.getGroceryList);
router.post("/:flatId", groceryListController.addItemToGroceryList);
router.put("/:flatId/:groceryId", groceryListController.updateGroceryListItem);
router.delete(
  "/:flatId/:groceryId",
  groceryListController.deleteGroceryListItem
);

module.exports = router;
