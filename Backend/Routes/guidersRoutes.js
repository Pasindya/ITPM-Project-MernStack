const express = require("express");
const router = express.Router();

// Import guider model and controller
const guidersControls = require("../Controllers/guidersControl");

// Get all guiders
router.get("/", guidersControls.getAllguiders);

// Get guider by ID
router.get("/:id", guidersControls.getById);

// Add a new guider
router.post("/", guidersControls.addGuiders);

// Update guider details
router.put("/:id", guidersControls.updateguider);

// Delete a guider
router.delete("/:id", guidersControls.deleteguider);

// Export router
module.exports = router;
