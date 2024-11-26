import axios from "axios";

// Create an instance of axios with the base URL
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// User Service
const userService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await apiClient.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      throw error.response.data || error.message;
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/users/login", credentials);

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data; // This will return the token
    } catch (error) {
      throw error.response.data || error.message;
    }
  },
};

export default userService;
