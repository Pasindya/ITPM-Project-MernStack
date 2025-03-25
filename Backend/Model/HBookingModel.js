const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HBookingSchema = new Schema({
    _id: {
        type: String,
        default: () => `HB_${Math.floor(100000 + Math.random() * 900000)}`
    },
    hotelName: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    }
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Add duration virtual field
HBookingSchema.virtual('duration').get(function() {
    return (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);
});

module.exports = mongoose.model("HBooking", HBookingSchema);