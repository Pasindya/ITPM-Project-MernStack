const express = require("express");
const router = express.Router();
// Insert Route
const Event = require("../Model/EventModel");
// Insert EventController
const EventController = require("../Controllers/EventControl");

router.get("/", EventController.getAllEvents);
router.post("/", EventController.addEvent);

//export
module.exports = router;