const express = require("express");
const router = express.Router();

//Insert model
const HTransport = require("../Model/HTransportModel");

//Insert Controler
const HTransportController= require("../Controllers/HTransportControl");

router.get("/",HTransportController.getAllHTransports);


//export
module.exports = router;