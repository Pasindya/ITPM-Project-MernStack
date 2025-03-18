const express = require("express");
const router = express.Router();
// Insert Route
const Event = require("../Model/EventModel");
// Insert EventController
const EventController = require("../Controllers/EventControl");

router.get("/", EventController.getAllEvents);
router.post("/", EventController.addEvent);
router.get("/:id", EventController.getById);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

//export
module.exports = router;