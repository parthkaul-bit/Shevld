const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController");

// Create a new flat
router.post("/create", flatController.createFlat);

// Add a user to a flat
router.put("/:flatId/addUser", flatController.addUserToFlat);

// Remove a user from a flat
router.put("/:flatId/removeUser", flatController.removeUserFromFlat);

module.exports = router;
