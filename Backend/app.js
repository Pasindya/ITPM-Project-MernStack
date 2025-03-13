const express = require("express");
const mongoose = require("mongoose");



const app = express();

//Middleware
app.use("/", (req, res,next) => {
    res.send("It is Working properly");
})


//database connection
mongoose.connect("mongodb+srv://travel:1234@cluster0.nitw6zk.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));