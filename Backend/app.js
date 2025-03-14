const express = require("express");
const mongoose = require("mongoose");
const hbookingrouter = require("./Routes/HBookingRoute")
const packbookingrouter = require("./Routes/PackBookingRoute")

const app = express();

//Middleware
app.use(express.json());
app.use("/hbookings",hbookingrouter);
app.use("/packbookings",packbookingrouter);

//database connection
mongoose.connect("mongodb+srv://travel:1234@cluster0.nitw6zk.mongodb.net/")
.then(()=> console.log("Connected to MongoDB Successfully"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));