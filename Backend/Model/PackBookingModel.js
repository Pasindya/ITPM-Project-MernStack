const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackBookingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],  // Adjust regex as necessary
    
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email regex
    },
    livingCountry: {
        type: String,
        required: true,
        trim: true,
    },
    package: {
        type: String,
        required: false,
        trim: true,
    },
    arrivalDate: {
        type: Date,  // Correcting the type to Date
        required: true,
    },
    noOfTravellers: {
        type: Number,  // Changed from String to Number
        required: true,
    }
});

module.exports = mongoose.model("PackBooking", PackBookingSchema);
