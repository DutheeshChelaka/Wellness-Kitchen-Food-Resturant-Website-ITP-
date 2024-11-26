const express = require("express");
const orderController = require("./controller.js");

const router = express.Router();

// @route   POST /api/v1/orders
// @desc    Create a new order
router.post("/", orderController.createOrder);

// @route   GET /api/v1/orders/:id
// @desc    Get order by id
router.get("/:id", orderController.getOrder);

// @route   GET /api/v1/orders
// @desc    Get all orders
router.get("/", orderController.getAllOrders);

// @route   PUT /api/v1/orders/:id/status
// @desc    Update order status
router.put("/:id/status", orderController.updateOrderStatus);

// @route   DELETE /api/v1/orders/:id
// @desc    Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
