const express = require("express");
const router = express.Router();

//Insert model
const HBooking = require("../Model/HBookingModel")

//Insert Controler
const HBookingController = require("../Controllers/HBookingControl");

router.get("/",HBookingController.getAllHBookings);
router.post("/",HBookingController.addHBookings);
router.get("/:id",HBookingController.getById);
//export
module.exports = router;
