const mongoose = require("mongoose");
const Guiders = require("../Model/guidersModel");

// Get all guiders
const getAllguiders = async (req, res) => {
    try {
        const allGuiders = await Guiders.find();
        if (!allGuiders || allGuiders.length === 0) {
            return res.status(404).json({ message: "No guiders found" });
        }
        return res.status(200).json({ guiders: allGuiders });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Add a new guider
const addGuiders = async (req, res) => {
    const { Nid, name, age, gender, contactNumber, email, location, experience, languages, availability, bio } = req.body;

    try {
        const newGuider = new Guiders({
            Nid,
            name,
            age,
            gender,
            contactNumber,
            email,
            location,
            experience,
            languages,
            availability,
            bio
        });

        await newGuider.save();
        return res.status(201).json({ message: "Guider added successfully", guider: newGuider });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Get guider by ID
const getById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid guider ID format" });
    }

    try {
        const guider = await Guiders.findById(id);
        if (!guider) {
            return res.status(404).json({ message: "Guider not found" });
        }
        return res.status(200).json({ guider });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Update guider details
const updateguider = async (req, res) => {
    const id = req.params.id;
    const { Nid, name, age, gender, contactNumber, email, location, experience, languages, availability, bio } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid guider ID format" });
    }

    try {
        const updatedGuider = await Guiders.findByIdAndUpdate(
            id,
            { Nid, name, age, gender, contactNumber, email, location, experience, languages, availability, bio },
            { new: true, runValidators: true } // Return updated document & validate data
        );

        if (!updatedGuider) {
            return res.status(404).json({ message: "Guider not found" });
        }

        return res.status(200).json({ message: "Guider updated successfully", guider: updatedGuider });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Delete guider
const deleteguider = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid guider ID format" });
    }

    try {
        const deletedGuider = await Guiders.findByIdAndDelete(id);

        if (!deletedGuider) {
            return res.status(404).json({ message: "Guider not found" });
        }

        return res.status(200).json({ message: "Guider deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Export functions properly
module.exports = { getAllguiders, addGuiders, getById, updateguider, deleteguider };
