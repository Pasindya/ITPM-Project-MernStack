const HTransport = require("../Model/HTransportModel");

const getAllHTransports = async (req, res, next) => {
    try {
        const htransports = await HTransport.find();
        if (!htransports || htransports.length === 0) {
            return res.status(404).json({ message: "No vehicles found" });
        }
        return res.status(200).json({ htransports });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Data insert with auto-generated HTB ID
const addHTransports = async (req, res, next) => {
    const {
        vehicleType,
        name,
        mobile,
        passportNumber,
        expectedDays,
        bookingdate,
        handoverDate
    } = req.body;

    try {
        // Generate HTB ID
        const generateHTBId = () => {
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            return `HTB${randomNum}`;
        };

        let htransport = new HTransport({
            _id: generateHTBId(),
            vehicleType,
            name,
            mobile,
            passportNumber,
            expectedDays,
            bookingdate,
            handoverDate
        });

        await htransport.save();
        return res.status(201).json({ htransport });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: "Failed to generate unique ID. Please try again." });
        }
        return res.status(500).json({ message: "Unable to add vehicle" });
    }
};

// Get by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const htransport = await HTransport.findById(id);
        if (!htransport) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({ htransport });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update vehicle details
const updatedHTransports = async (req, res, next) => {
    const id = req.params.id;
    const {
        vehicleType,
        name,
        mobile,
        passportNumber,
        expectedDays,
        bookingdate,
        handoverDate,
        pricePerKm
    } = req.body;

    try {
        const htransport = await HTransport.findByIdAndUpdate(
            id,
            {
                vehicleType,
                name,
                mobile,
                passportNumber,
                expectedDays,
                bookingdate,
                handoverDate,
                pricePerKm
            },
            { new: true } // Return the updated document
        );

        if (!htransport) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({ htransport });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete vehicle
const deleteHtransports = async (req, res, next) => {
    const id = req.params.id;

    try {
        const htransport = await HTransport.findByIdAndDelete(id);
        if (!htransport) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({ 
            message: "Vehicle deleted successfully",
            deletedVehicle: htransport 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getAllHTransports = getAllHTransports;
exports.addHTransports = addHTransports;
exports.getById = getById;
exports.updatedHTransports = updatedHTransports;
exports.deleteHtransports = deleteHtransports;