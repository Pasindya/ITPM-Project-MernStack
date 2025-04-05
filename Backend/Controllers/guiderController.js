const Guider = require("../Model/guiderModel"); // Use require instead of import
const { v2: cloudinary } = require('cloudinary'); // Use require for Cloudinary

// Create a new Guider
const createGuider = async (req, res) => {
    try {
        const { nic, name, gender, contactNumber, email, location, experience, languages, bio } = req.body;
        let guiderpic = ""; // Declare guiderpic variable

        // Check if a file is uploaded
        if (req.file) {
            try {
                console.log("Uploading image to Cloudinary:", req.file.path); // Debug log
                const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
                    folder: "guiders",
                });
                guiderpic = uploadedResponse.secure_url; // Assign Cloudinary URL
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({ success: false, message: "Image upload failed" });
            }
        } else {
            console.warn("No file uploaded! req.file is undefined.");
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const newGuider = new Guider({
            nic,
            name,
            gender,
            contactNumber,
            email,
            location,
            experience,
            languages: languages.split(","),
            bio,
            guiderpic, // Store Cloudinary URL
        });

        await newGuider.save();
        res.status(201).json(newGuider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Guiders
const getGuiders = async (req, res) => {
    try {
        const guiders = await Guider.find();
        res.status(200).json(guiders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Guider by ID
const getGuiderById = async (req, res) => {
    try {
        const guider = await Guider.findById(req.params.id);
        if (!guider) {
            return res.status(404).json({ message: "Guider not found" });
        }
        res.status(200).json(guider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Guider
const deleteGuider = async (req, res) => {
    try {
        const guider = await Guider.findByIdAndDelete(req.params.id);
        if (!guider) {
            return res.status(404).json({ message: "Guider not found" });
        }
        res.status(200).json({ message: "Guider deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Guider details
const updateGuider = async (req, res) => {
    try {
        const { nic, name, gender, contactNumber, email, location, experience, languages, bio } = req.body;
        let guider = await Guider.findById(req.params.id);

        if (!guider) {
            return res.status(404).json({ message: "Guider not found" });
        }

        let guiderpic = guider.guiderpic; // Retain the old image unless updated

        // If a new file is uploaded, replace the old image
        if (req.file) {
            try {
                console.log("Uploading new image to Cloudinary:", req.file.path);
                const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
                    folder: "guiders",
                });
                guiderpic = uploadedResponse.secure_url; // Assign new Cloudinary URL
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({ success: false, message: "Image upload failed" });
            }
        }

        // Update guider details
        guider.nic = nic || guider.nic;
        guider.name = name || guider.name;
        guider.gender = gender || guider.gender;
        guider.contactNumber = contactNumber || guider.contactNumber;
        guider.email = email || guider.email;
        guider.location = location || guider.location;
        guider.experience = experience || guider.experience;
        guider.languages = languages ? languages.split(",") : guider.languages;
        guider.bio = bio || guider.bio;
        guider.guiderpic = guiderpic;

        await guider.save();
        res.status(200).json(guider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGuider,
    getGuiders,
    getGuiderById,
    deleteGuider,
    updateGuider
};
