const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackBookingSchema = new Schema({
    _id: {
        type: String, // Set _id as a string
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    livingCountry: {
        type: String,
        required: true,
        trim: true,
    },
    tpackage: {
        type: String,
        required: true,
        trim: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("PackBooking", PackBookingSchema);