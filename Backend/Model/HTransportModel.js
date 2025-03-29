const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HTransportSchema = new Schema({
   
    vehicleType: { 
        type: String, 
        required: [true, "Vehicle type is required"], 
        trim: true,
        enum: [
            "Hatchback", 
            "Sedan", 
            "Aqua",
            "Prius",
            "Hybrid Car",
            "Wagoner Car",
            "Standard Van", 
            "Luxury Van", 
            "Mini Bus", 
            "Tourist Coach Bus", 
            "Jeep", 
            "4x4 SUV",
            "Motor Bicycle", 
            "Scooter",
            "Tuk Tuk Wheel",
            "Bicycle Ride" // Add "Tuk Tuk Wheel" to the enum
        ]

    },
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
    passportNumber: {
        type: String,
    },
    expectedDays: { 
        type: Number, 
        required: [true, "Expected days is required"], 
        min: [1, "Expected days must be at least 1"] 
    },
    bookingdate: {
        type: Date,
        required: true, 
      },
    handoverDate: {
        type: Date,
        required: true,
      },
    pricePerKm: { 
        type: Number,  
        required: false // Will be auto-filled based on vehicleType
    },
    
}
);


// Auto-assign pricePerKm and calculate fullPayment before saving
HTransportSchema.pre('save', function (next) {
    // Convert vehicleType to title case and trim spaces
    this.vehicleType = this.vehicleType.trim();

    const vehiclePrices = {
        "Hatchback": 130,
        "Sedan": 120,
        "Aqua":110,
        "Prius":140,
        "Hybrid Car":150,
        "Wagoner Car":110,
        "Standard Van": 100,
        "Luxury Van": 200,
        "Mini Bus": 120,
        "Tourist Coach Bus": 200,
        "Jeep": 150,
        "4x4 SUV":180,
        "Tuk Tuk Wheel": 90, // Add price for "Tuk Tuk Wheel"
        "Motor Bicycle": 80,
        "Scooter": 70,
        "Bicycle Ride":50
    };

    // Assign pricePerKm automatically based on vehicleType
    if (vehiclePrices[this.vehicleType]) {
        this.pricePerKm = vehiclePrices[this.vehicleType];
    } else {
        return next(new Error(`Invalid vehicle type. Please select a valid type from: ${Object.keys(vehiclePrices).join(", ")}`));
    }
    next();

});

module.exports = mongoose.model("HTransport", HTransportSchema);