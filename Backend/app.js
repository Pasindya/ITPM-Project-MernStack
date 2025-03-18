const express = require("express");
const mongoose = require("mongoose");
const hbookingrouter = require("./Routes/HBookingRoute")
const packbookingrouter = require("./Routes/PackBookingRoute")
const HTransportRoute = require("./Routes/HTransportRoute")
const EventRoute = require("./Routes/EventRoute");


const app = express();

//Middleware
app.use(express.json());
app.use("/hbookings",hbookingrouter);
app.use("/packbookings",packbookingrouter);
app.use("/htransports",HTransportRoute);
app.use("/events",EventRoute);

//database connection
mongoose.connect("mongodb+srv://travel:1234@cluster0.nitw6zk.mongodb.net/traveltrails")
.then(()=> console.log("Connected to MongoDB Successfully"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));