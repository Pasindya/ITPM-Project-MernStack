const PackBooking = require("../Model/PackBookingModel");

// Function to generate a custom ID starting with PBK_ followed by 5 digits
const generateCustomId = async () => {
    const prefix = "PBK_";
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    const customId = prefix + randomDigits;

    // Check if the generated ID already exists in the database
    const existingBooking = await PackBooking.findById(customId);
    if (existingBooking) {
        return generateCustomId(); // Recursively generate a new ID if it already exists
    }
    return customId;
};

// Get all package bookings
const getAllPackBookings = async (req, res, next) => {
    let packbookings;

    try {
        packbookings = await PackBooking.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!packbookings) {
        return res.status(404).json({ message: "Package Booking not found" });
    }
    return res.status(200).json({ packbookings });
};

// Add a new package booking
const addPackBookings = async (req, res, next) => {
    const { name, mobile, email, livingCountry, tpackage, arrivalDate, noOfTravellers } = req.body;
    let packbookings;

    try {
        const customId = await generateCustomId(); // Generate the custom ID
        packbookings = new PackBooking({
            _id: customId, // Assign the custom ID to the _id field
            name,
            mobile,
            email,
            livingCountry,
            tpackage,
            arrivalDate,
            noOfTravellers
        });
        await packbookings.save();
    } catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!packbookings) {
        return res.status(404).send({ message: "Unable to add bookings" });
    }
    return res.status(200).json({ packbookings });
};

// Get a package booking by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let packbookings;

    try {
        packbookings = await PackBooking.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!packbookings) {
        return res.status(404).send({ message: "Booked packages not found" });
    }
    return res.status(200).json({ packbookings });
};

// Update a package booking
const updatePackBooking = async (req, res, next) => {
    const id = req.params.id;
    const { name, mobile, email, livingCountry, tpackage, arrivalDate, noOfTravellers } = req.body;
    let packbookings;

    try {
        packbookings = await PackBooking.findByIdAndUpdate(
            id,
            {
                name,
                mobile,
                email,
                livingCountry,
                tpackage,
                arrivalDate,
                noOfTravellers
            },
            { new: true } // Return the updated document
        );
    } catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!packbookings) {
        return res.status(404).send({ message: "Package bookings not found" });
    }
    return res.status(200).json({ packbookings });
};

// Delete a package booking
const deletePackBooking = async (req, res, next) => {
    const id = req.params.id;
    let packbookings;

    try {
        packbookings = await PackBooking.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!packbookings) {
        return res.status(404).send({ message: "Unable to delete" });
    }
    return res.status(200).json({ packbookings });
};

// Export all functions
module.exports = {
    getAllPackBookings,
    addPackBookings,
    getById,
    updatePackBooking,
    deletePackBooking
};