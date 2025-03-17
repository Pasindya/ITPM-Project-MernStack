const HTransport = require("../Model/HTransportModel");

const getAllHTransports = async (req, res, next) =>{

    let HTransports;

    //get all bookings
    try{
        htransports = await HTransport.find();
    }catch (err) {
        console.log(err);
    }

    //notfound
    if(!htransports){
        return res.status(404).json({message:"Vehicle not found"})
    }
    //Display all bookings
    return res.status(200).json({htransports});
};


//data insert
const addHTransports  = async (req, res, next) =>{

    const {vehicleName,vehicleType,registrationNumber,capacity,isHotelVehicle} = req.body;
    let htransports;

    try {
        htransports = new HTransport({vehicleName,vehicleType,registrationNumber,capacity,isHotelVehicle});
        await htransports.save();
    }catch (err){
        console.log(err);
    }

    //not insert bookings
    if (!htransports){
        return res.status(404).send({message:"unable to add vehicle"});

    }
    return res.status(200).json({htransports});
};






exports.getAllHTransports = getAllHTransports;
exports.addHTransports = addHTransports;
