const HBooking = require("../Model/HBookingModel");

// Create booking
const addHBookings = async (req, res) => {
    try {
        const { hotelName, checkIn, checkOut, guests, name, email, phone } = req.body;

        // Validate input
        if (!checkIn || !checkOut) {
            return res.status(400).json({ 
                success: false,
                message: "Both check-in and check-out dates are required"
            });
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            return res.status(400).json({
                success: false,
                message: "Check-out date must be after check-in date"
            });
        }

        const booking = new HBooking({
            hotelName,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guests,
            name,
            email,
            phone
        });

        await booking.save();

        // Create clean response
        const responseData = booking.toObject();
        delete responseData.__v;

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: responseData
        });

    } catch (error) {
        console.error("Booking error:", error);
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate ID generated, please try again"
            });
        }
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Get all bookings
const getAllHBookings = async (req, res) => {
    try {
        const bookings = await HBooking.find().lean();
        const cleanBookings = bookings.map(booking => {
            const { __v, ...rest } = booking;
            return rest;
        });
        
        res.status(200).json({
            success: true,
            count: cleanBookings.length,
            data: cleanBookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get single booking
const getById = async (req, res) => {
    try {
        const booking = await HBooking.findById(req.params.id).lean();

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const { __v, ...cleanBooking } = booking;

        res.status(200).json({
            success: true,
            data: cleanBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Update booking
const updateHBooking = async (req, res) => {
    try {
        const updatedBooking = await HBooking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const { __v, ...cleanBooking } = updatedBooking;

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: cleanBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Delete booking
const deleteHBooking = async (req, res) => {
    try {
        const deletedBooking = await HBooking.findByIdAndDelete(req.params.id).lean();

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const { __v, ...cleanBooking } = deletedBooking;

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            data: cleanBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    addHBookings,
    getAllHBookings,
    getById,
    updateHBooking,
    deleteHBooking
};