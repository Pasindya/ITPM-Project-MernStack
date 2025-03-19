const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guiderSchema = new Schema({
    Nid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: Number, // Years of experience
        required: true
    },
    languages: {
        type: [String], // Array of languages spoken
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    bio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("guidersModel", guiderSchema);
