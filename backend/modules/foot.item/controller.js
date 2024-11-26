const foodService = require("./service.js");

const getFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFood = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const newFood = await foodService.createFood(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const updatedFood = await foodService.updateFood(req.params.id, req.body);
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const deletedFood = await foodService.deleteFood(req.params.id);
    res.status(200).json({ message: `Food with id ${req.params.id} deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
