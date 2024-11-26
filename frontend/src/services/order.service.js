import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/order";

class OrderService {
  // Get all orders
  async getAllOrders() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const response = await axios.get(`${BASE_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }

  // Create a new order
  async createOrder(orderData) {
    try {
      const response = await axios.post(BASE_URL, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      console.log(`Attempting to update order: ${BASE_URL}/${orderId}/status`);

      const response = await axios.put(`${BASE_URL}/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);

      throw error;
    }
  }

  // Delete an order
  async deleteOrder(orderId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}

export const orderService = new OrderService();
