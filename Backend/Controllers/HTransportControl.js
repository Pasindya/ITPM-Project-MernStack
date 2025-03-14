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

exports.getAllHTransports = getAllHTransports;

