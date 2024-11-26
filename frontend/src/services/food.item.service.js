import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/food-item";

class FoodItemService {
  // Get all food items
  async getAllFoodItems() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching food items:", error);
      throw error;
    }
  }

  // Get food item by ID
  async getFoodItemById(foodItemId) {
    try {
      const response = await axios.get(`${BASE_URL}/${foodItemId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching food item:", error);
      throw error;
    }
  }

  // Create a new food item
  async createFoodItem(foodItemData) {
    try {
      const response = await axios.post(BASE_URL, foodItemData);
      return response.data;
    } catch (error) {
      console.error("Error creating food item:", error);
      throw error;
    }
  }

  // Update a food item
  async updateFoodItem(foodItemId, foodItemData) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${foodItemId}`,
        foodItemData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating food item:", error);
      throw error;
    }
  }

  // Delete a food item
  async deleteFoodItem(foodItemId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${foodItemId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting food item:", error);
      throw error;
    }
  }
}

export const foodItemService = new FoodItemService();
