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
const addHBookings  = async (req, res, next) =>{

    const {firstName,lastName,streetAddress,streetAddress2,city,state,postalCode,contactNo,email,arrivalDate,arrivalTime,departureDate,departureTime,numberAdult,anydetail} = req.body;
    let hbookings;

    try {
        hbookings = new HBooking({firstName,lastName,streetAddress,streetAddress2,city,state,postalCode,contactNo,email,arrivalDate,arrivalTime,departureDate,departureTime,numberAdult,anydetail});
        await hbookings.save();
    }catch (err){
        console.log(err);
    }

    //not insert bookings
    if (!hbookings){
        return res.status(404).send({message:"unable to add bookings"});

    }
    return res.status(200).json({hbookings});
};

exports.getAllHBookings = getAllHBookings;
exports.addHBookings = addHBookings;