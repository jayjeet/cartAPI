const express = require("express");
const itemController = require("../controller/itemController");
const router = express.Router();

router.post("/addProduct", itemController.createProduct);
router.get("/getAllProducts", itemController.getAllProducts);

// router.post("/addToCart",itemController.)

module.exports = router;
