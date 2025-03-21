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

    const {vehicleType,
        name,
        mobile,
        passportNumber,
        expectedDays,
        bookingdate,
        handoverDate,
        pricePerKm} = req.body;
    let htransports;

    try {
        htransports = new HTransport({vehicleType,
            name,
            mobile,
            passportNumber,
            expectedDays,
            bookingdate,
            handoverDate,
            pricePerKm});
        await htransports.save();
    }catch (err){
        console.log(err);
    }

    //not insert vehicle
    if (!htransports){
        return res.status(404).send({message:"unable to add vehicle"});

    }
    return res.status(200).json({htransports});
};


    //Get by ID
    const getById = async (req, res, next) => {

        const id = req.params.id;

        let htransports;

        try {
            htransports= await HTransport.findById(id);
        }catch (err){
            console.log(err);
        }


    //not available vehicle
    if (! htransports){
        return res.status(404).send({message:" Vehicle not found"});

    }
    return res.status(200).json({htransports});

    }

  //Update vehicle details
    const updatedHTransports = async (req, res, next) => {

        const id = req.params.id;
        const {vehicleType,
            name,
            mobile,
            passportNumber,
            expectedDays,
            bookingdate,
            handoverDate,
            pricePerKm} = req.body;

        let htransports;

        try {
          htransports = await HTransport.findByIdAndUpdate(id,
            {vehicleType:vehicleType,
                name:name,
                mobile:mobile,
                passportNumber:passportNumber,
                expectedDays:expectedDays,
                bookingdate:bookingdate,
                handoverDate:handoverDate,
                pricePerKm:pricePerKm});
            htransports = await htransports.save();
        }catch(err){
            console.log(err);
        }
        
        //not available bookings
        if (!htransports){
        return res.status(404).send({message:" vehicles not found"});

        }
         return res.status(200).json({htransports});

        };

    
        //delete user
    
        const deleteHtransports = async (req, res, next) => {
            const id = req.params.id;
    
            let htransports;
    
            try{
    
                htransports = await HTransport.findByIdAndDelete(id)
            }catch (err) {
                console.log(err);
            }
    
            //not available bookings
            if (!htransports){
                return res.status(404).send({message:" Unable to delete"});
        
                }
                 return res.status(200).json({htransports});
        
    
        };
        
         
          
        
    
       



exports.getAllHTransports = getAllHTransports;
exports.addHTransports = addHTransports;
exports.getById = getById;
exports.updatedHTransports = updatedHTransports;
exports.deleteHtransports = deleteHtransports;