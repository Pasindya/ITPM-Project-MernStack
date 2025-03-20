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
            "Van", 
            "Luxury Van", 
            "Mini Bus", 
            "Tourist Coach Bus", 
            "Jeep", 
            "Motor Bicycle", 
            "Scooter",
            "Tuk Tuk Wheel" // Add "Tuk Tuk Wheel" to the enum
        ]
    },
    capacity: { 
        type: Number, 
        required: [true, "Capacity is required"], 
        min: [1, "Capacity must be at least 1"] 
    },
    expectedDays: { 
        type: Number, 
        required: [true, "Expected days is required"], 
        min: [1, "Expected days must be at least 1"] 
    },
    travelLocation: { 
        type: String, 
        required: [true, "Travel location is required"], 
        trim: true 
    },
    locationKm: { 
        type: Number,  
        required: [true, "Location distance (KM) is required"], 
        min: [1, "Distance must be at least 1 KM"] 
    },
    pricePerKm: { 
        type: Number,  
        required: false // Will be auto-filled based on vehicleType
    },
    fullPayment: { 
        type: Number, 
        required: false, // Will be auto-calculated
        min: [0, "Full payment cannot be negative"] 
    }
});

// Auto-assign pricePerKm and calculate fullPayment before saving
HTransportSchema.pre('save', function (next) {
    // Convert vehicleType to title case and trim spaces
    this.vehicleType = this.vehicleType.trim();

    const vehiclePrices = {
        "Hatchback": 130,
        "Sedan": 110,
        "Van": 100,
        "Luxury Van": 200,
        "Mini Bus": 120,
        "Tourist Coach Bus": 200,
        "Jeep": 150,
        "Tuk Tuk Wheel": 90, // Add price for "Tuk Tuk Wheel"
        "Motor Bicycle": 80,
        "Scooter": 70
    };

    // Assign pricePerKm automatically based on vehicleType
    if (vehiclePrices[this.vehicleType]) {
        this.pricePerKm = vehiclePrices[this.vehicleType];
    } else {
        return next(new Error(`Invalid vehicle type. Please select a valid type from: ${Object.keys(vehiclePrices).join(", ")}`));
    }

    // Ensure locationKm is provided before calculating fullPayment
    if (this.locationKm) {
        this.fullPayment =  (this.pricePerKm * this.locationKm);
    } else {
        this.fullPayment = 0;
    }

    next();
});

module.exports = mongoose.model("HTransport", HTransportSchema);