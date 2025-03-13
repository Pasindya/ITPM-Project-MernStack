const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/HBookingRoute")

const app = express();

//Middleware
app.use(express.json());
app.use("/hbookings",router);

//database connection
mongoose.connect("mongodb+srv://thisurasenawin:1234@cluster0.b8mmc.mongodb.net/")
.then(()=> console.log("Connected to MongoDB Successfully"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));