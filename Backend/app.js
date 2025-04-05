const express = require("express");
const mongoose = require("mongoose");
const hbookingrouter = require("./Routes/HBookingRoute");
const packbookingrouter = require("./Routes/PackBookingRoute");
const HTransportRoute = require("./Routes/HTransportRoute");
const EventRoute = require("./Routes/EventRoute");
const guiderRoutes = require("./Routes/guiderRoutes");
const connectCloudinary = require("./config/cloudinary.js");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS

const app = express();

// Use dotenv for environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS globally for all routes

// API routes
app.use("/hbookings", hbookingrouter);
app.use("/packbookings", packbookingrouter);
app.use("/htransports", HTransportRoute);
app.use("/events", EventRoute);
app.use("/api/guiders", guiderRoutes);

// Connect to Cloudinary for image uploads (optional)
connectCloudinary();

// Database connection
mongoose
  .connect("mongodb+srv://travel:1234@cluster0.nitw6zk.mongodb.net/traveltrails")
  .then(() => console.log("Connected to MongoDB Successfully"))
  .then(() => {
    // Start the server once the DB is connected
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.log(err));

