const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HBookingSchema = new Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,

    },
    streetAddress:{
        type:String,
        required:true,

    },
    streetAddress2:{
        type:String,
        required:false,

    },
    city:{
        type:String,
        required:true,

    },
    state:{
        type:String,
        required:true,

    },
    postalCode:{
        type:String,
        required:false,

    },
    contactNo:{
        type:String,
        required:true,

    },
    gmail:{
        type:String,
        required:false,

    },
    arrivalDate:{
        type:Date,
        required:true,

    },
    arrivalTime:{
        type:String,
        required:true,

    },
    departureDate:{
        type:Date,
        required:true,

    },
    departureTime:{
        type:String,
        required:true,

    },
    numberAdult:{
        type:Number,
        required:true,
    },
    anydetail:{
        type:String,
        required:false,
    }



    

});

 module.exports = mongoose.model(
    "HBookingModel",
    HBookingSchema

)