const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const GuiderController = require("../Controllers/guiderController");

router.post("/", upload.single("guiderpic"), GuiderController.createGuider);
router.get("/", GuiderController.getGuiders);
router.get("/:id", GuiderController.getGuiderById);
router.delete("/:id", GuiderController.deleteGuider);
router.put("/:id", upload.single("guiderpic"), GuiderController.updateGuider);

module.exports = router;
