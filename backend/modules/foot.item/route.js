const express = require("express");
const foodController = require("./controller.js");

const router = express.Router();

// @route   GET /api/v1/foods
// @desc    Get all foods
router.get("/", foodController.getFoods);

// @route   GET /api/v1/foods/:id
// @desc    Get food by id
router.get("/:id", foodController.getFood);

// @route   POST /api/v1/foods
// @desc    Create a new food
router.post("/", foodController.createFood);

// @route   PUT /api/v1/foods/:id
// @desc    Update an existing food
router.put("/:id", foodController.updateFood);

// @route   DELETE /api/v1/foods/:id
// @desc    Delete a food
router.delete("/:id", foodController.deleteFood);

module.exports = router;
