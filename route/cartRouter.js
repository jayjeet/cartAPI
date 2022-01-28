const router = require("express").Router();
const cartController = require("../controller/cartController");

router.post("/addToCart", cartController.addItemToCart);
router.get("/viewCart", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);

module.exports = router;
