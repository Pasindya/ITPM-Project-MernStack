
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HTransportSchema = new Schema({
   
    vehicleName: 
        { type: String, 
          required: true 
        },

    vehicleType: 
        { type: String, 
          required: true 
        }, 

    registrationNumber: 
        { type: String, 
           required: true, 
           unique: true 
        },

    capacity: 
        { type: Number, 
          required: true 
        }, 

    isHotelVehicle: 
        { type: Boolean, 
          required: true 
        }, // True if hotel vehicle, false if self vehicle



});

module.exports = mongoose.model("HTransport", HTransportSchema);
