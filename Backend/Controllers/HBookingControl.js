const HBooking = require("../Model/HBookingModel");

const getAllHBookings = async (req, res, next) =>{

    let HBookings;

    //get all bookings
    try{
        hbookings = await HBooking.find();
    }catch (err) {
        console.log(err);
    }

    //notfound
    if(!hbookings){
        return res.status(404).json({message:"Booking not found"})
    }
    //Display all bookings
    return res.status(200).json({hbookings});
};



//data insert
const addBookings  = async (req, res, next) =>{

    const {firstName,lastName,streetAddress,streetAddress2,city,state,postalCode,contactNo,gmail,arrivalDate,arrivalTime,departureDate,departureTime,numberAdult,anydetail} = req.body;
    let bookings;

    try {
        bookings = new bookings({firstName,lastName,streetAddress,streetAddress2,city,state,postalCode,contactNo,gmail,arrivalDate,arrivalTime,departureDate,departureTime,numberAdult,anydetail});
        await bookings.save();
    }catch (err){
        console.log(err);
    }
}

exports.getAllHBookings = getAllHBookings;