const PackBooking = require("../Model/PackBookingModel");

const getAllPackBookings = async (req, res, next) =>{

    let PackBookings;

    //get all bookings
    try{
        packbookings = await PackBooking.find();
    }catch (err) {
        console.log(err);
    }

    //notfound
    if(!packbookings){
        return res.status(404).json({message:"Package Booking not found"})
    }
    //Display all package bookings
    return res.status(200).json({packbookings});
};



//data insert
const addPackBookings  = async (req, res, next) =>{

    const {name,mobile,email,livingCountry,package,arrivalDate,noOfTravellers} = req.body;
    let packbookings;

    try {
        packbookings = new PackBooking({name,mobile,email,livingCountry,package,arrivalDate,noOfTravellers});
        await packbookings.save();
    }catch (err){
        console.log(err);
    }

    //not insert bookings
    if (!packbookings){
        return res.status(404).send({message:"unable to add bookings"});

    }
    return res.status(200).json({packbookings});
};


    //Get by ID
    const getById = async (req, res, next) => {

        const id = req.params.id;

        let packbookings;

        try {
            packbookings = await PackBooking.findById(id);
        }catch (err){
            console.log(err);
        }


        //not available bookings
    if (!packbookings){
        return res.status(404).send({message:" Booked packages not found"});

    }
    return res.status(200).json({packbookings});

    }
   

    //Update package details
    const updatePackBooking = async (req, res, next) => {

        const id = req.params.id;
        const {name,mobile,email,livingCountry,package,arrivalDate,noOfTravellers} = req.body;

        let packbookings;

        try {
          packbookings = await PackBooking.findByIdAndUpdate(id,
            {name:name ,mobile:mobile ,email:email,livingCountry:livingCountry,package :package,arrivalDate:arrivalDate ,noOfTravellers:noOfTravellers});
            packbookings = await packbookings.save();
        }catch(err){
            console.log(err);
        }
        
        //not available bookings
        if (!packbookings){
        return res.status(404).send({message:" package bookings not found"});

        }
         return res.status(200).json({packbookings});

    
          
        
    };
       

    //delete user

    const deletePackBooking = async (req, res, next) => {
        const id = req.params.id;

        let packbookings;

        try{

            packbookings = await PackBooking.findByIdAndDelete(id)
        }catch (err) {
            console.log(err);
        }

        //not available bookings
        if (!packbookings){
            return res.status(404).send({message:" Unable to delete"});
    
            }
             return res.status(200).json({packbookings});
    

    };

exports.getAllPackBookings = getAllPackBookings;
exports.addPackBookings = addPackBookings;
exports.getById = getById;
exports.updatePackBooking = updatePackBooking;
exports.deletePackBooking = deletePackBooking;