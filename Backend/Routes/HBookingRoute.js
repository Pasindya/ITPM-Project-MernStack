const express = require("express");
const router = express.Router();

//Insert model
const Booking = require("../Model/HBookingModel")

//Insert Controler
const BookingController = require("../Controllers/HBookingControl");

router.get("/",BookingController.getAllBookings);

//export
module.exports = router;
