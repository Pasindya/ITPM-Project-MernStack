const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HBookingSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    streetAddress: {
        type: String,
        required: true,
        trim: true,
    },
    streetAddress2: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    postalCode: {
        type: String,
        required: false,
        trim: true,
    },
    contactNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
        trim: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
        trim: true,
    },
    numberAdult: {
        type: Number,
        required: true,
        min: 1,
    },
    anydetail: {
        type: String,
        required: false,
        trim: true,
    },
});

module.exports = mongoose.model("HBooking", HBookingSchema);
