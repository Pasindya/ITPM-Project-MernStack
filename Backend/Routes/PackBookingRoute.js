const express = require("express");
const router = express.Router();

//Insert model
const PackBooking = require("../Model/PackBookingModel")

//Insert Controler
const PackBookingController= require("../Controllers/PackBookingControl");

router.get("/",PackBookingController.getAllPackBookings);
router.post("/",PackBookingController.addPackBookings);
router.get("/:id",PackBookingController.getById);
router.put("/:id",PackBookingController.updatePackBooking);
router.delete("/:id",PackBookingController.deletePackBooking);

//export
module.exports = router;
