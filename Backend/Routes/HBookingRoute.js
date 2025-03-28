const express = require("express");
const router = express.Router();
const {
    addHBookings,
    getAllHBookings,
    getById,
    updateHBooking,
    deleteHBooking
} = require("../Controllers/HBookingControl");

// POST /api/bookings - Create new booking
router.post("/", addHBookings);

// GET /api/bookings - Get all bookings
router.get("/", getAllHBookings);

// GET /api/bookings/:id - Get single booking
router.get("/:id", getById);

// PUT /api/bookings/:id - Update booking
router.put("/:id", updateHBooking);

// DELETE /api/bookings/:id - Delete booking
router.delete("/:id", deleteHBooking);

module.exports = router;