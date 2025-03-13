const express = require("express");
const router = express.Router();

//Insert model
const HBooking = require("../Model/HBookingModel")

//Insert Controler
const HBookingController = require("../Controllers/HBookingControl");

router.get("/",HBookingController.getAllHBookings);

//export
module.exports = router;
