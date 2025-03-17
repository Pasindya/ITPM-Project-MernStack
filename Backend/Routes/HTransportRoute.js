const express = require("express");
const router = express.Router();

//Insert model
const HTransport = require("../Model/HTransportModel");

//Insert Controler
const HTransportController= require("../Controllers/HTransportControl");

router.get("/",HTransportController.getAllHTransports);
router.post("/",HTransportController.addHTransports);


//export
module.exports = router;