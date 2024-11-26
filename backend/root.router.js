const express = require("express");
const router = express.Router();
const orderRoutes = require("./modules/order/route.js");
const userRoutes = require("./modules/user/route.js");
const foodItemRoutes = require("./modules/foot.item/route.js");

router.use("/order", orderRoutes);
router.use("/food-item", foodItemRoutes);
router.use("/users", userRoutes);

module.exports = router;
