const { FoodModel } = require("./model.js");
const getAllFoods = async () => {
  try {
    return await FoodModel.find();
  } catch (error) {
    throw new Error("Error retrieving foods: " + error.message);
  }
};

const getFoodById = async (id) => {
  try {
    const food = await FoodModel.findById(id);
    if (!food) {
      throw new Error(`Food with id ${id} not found`);
    }
    return food;
  } catch (error) {
    throw new Error("Error retrieving food: " + error.message);
  }
};

const createFood = async (foodData) => {
  try {
    const newFood = new FoodModel(foodData);
    return await newFood.save();
  } catch (error) {
    throw new Error("Error creating food: " + error.message);
  }
};

const updateFood = async (id, foodData) => {
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(id, foodData, {
      new: true,
    });
    if (!updatedFood) {
      throw new Error(`Food with id ${id} not found for update`);
    }
    return updatedFood;
  } catch (error) {
    throw new Error("Error updating food: " + error.message);
  }
};

const deleteFood = async (id) => {
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(id);
    if (!deletedFood) {
      throw new Error(`Food with id ${id} not found for deletion`);
    }
    return deletedFood;
  } catch (error) {
    throw new Error("Error deleting food: " + error.message);
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
