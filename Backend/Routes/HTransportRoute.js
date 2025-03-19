const express = require("express");
const router = express.Router();

//Insert model
const HTransport = require("../Model/HTransportModel");

//Insert Controler
const HTransportController= require("../Controllers/HTransportControl");

router.get("/",HTransportController.getAllHTransports);
router.post("/",HTransportController.addHTransports);
router.get("/:id",HTransportController.getById);
router.put("/:id",HTransportController.updatedHTransports);
router.delete("/:id",HTransportController.deleteHtransports);
//export
module.exports = router;