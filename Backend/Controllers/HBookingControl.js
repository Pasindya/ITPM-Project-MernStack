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


    //Get by ID
    const getById = async (req, res, next) => {

        const id = req.params.id;

        let hbookings;

        try {
            hbookings = await HBooking.findById(id);
        }catch (err){
            console.log(err);
        }


        //not available bookings
    if (!hbookings){
        return res.status(404).send({message:" bookings not found"});

    }
    return res.status(200).json({hbookings});

    }
   

    //Update user details
    const updateHBooking = async (req, res, next) => {

        const id = req.params.id;
        const {firstName,lastName,streetAddress,streetAddress2,city,state,postalCode,contactNo,email,arrivalDate,arrivalTime,departureDate,departureTime,numberAdult,anydetail} = req.body;

        let hbookings;

        try {
          hbookings = await HBooking.findByIdAndUpdate(id,
            {firstName:firstName ,lastName:lastName ,streetAddress:streetAddress,streetAddress2:streetAddress2,city :city,state:state ,postalCode:postalCode,contactNo :contactNo,email :email,arrivalDate :arrivalDate,arrivalTime :arrivalTime,departureDate :departureDate,departureTime:departureTime,numberAdult :numberAdult,anydetail:anydetail});
            hbookings = await hbookings.save();
        }catch(err){
            console.log(err);
        }
        
        //not available bookings
        if (!hbookings){
        return res.status(404).send({message:" bookings not found"});

        }
         return res.status(200).json({hbookings});

    
          
        
    };


exports.getAllHBookings = getAllHBookings;
exports.addHBookings = addHBookings;
exports.getById = getById;
exports.updateHBooking = updateHBooking;