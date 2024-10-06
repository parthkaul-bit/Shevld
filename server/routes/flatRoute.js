const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController");

router.post("/create", flatController.createFlat);

router.put("/:flatId/addUser", flatController.addUserToFlat);

router.put("/:flatId/removeUser", flatController.removeUserFromFlat);

router.post("/:flatId/invite", flatController.inviteUserToFlat);

module.exports = router;
