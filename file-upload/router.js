const express = require("express")
const router = express.Router();
const controller = require("./controller");


router.post("/", controller.upload_file);
router.post("/create_image", controller.create_image);
router.delete("/delete_image/:id/", controller.delete_file);
router.get("/getById/:id", controller.getImageById);
router.get("/getAll", controller.getAll);

module.exports = router;