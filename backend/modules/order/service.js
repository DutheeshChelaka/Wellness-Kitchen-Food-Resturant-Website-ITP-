const {
  sendOrderShippedEmail,
} = require("../../../frontend/src/services/emailService.js");
const { OrderModel } = require("./model.js");

const createOrder = async (orderData) => {
  try {
    const newOrder = new OrderModel(orderData);
    return await newOrder.save();
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
};

const getOrderById = async (id) => {
  try {
    const order = await OrderModel.findById(id).populate("items.food");
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return order;
  } catch (error) {
    throw new Error("Error retrieving order: " + error.message);
  }
};

const getAllOrders = async () => {
  try {
    return await OrderModel.find().populate("items.food");
  } catch (error) {
    throw new Error("Error retrieving orders: " + error.message);
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      throw new Error(`Order with id ${id} not found for update`);
    }

    // Send an email if the order is marked as SHIPPED
    if (status === "SHIPPED") {
      const userEmail = updatedOrder.email; // Access the email directly from the order model
      await sendOrderShippedEmail(userEmail, id);
    }

    return updatedOrder;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
};

const deleteOrder = async (id) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error(`Order with id ${id} not found for deletion`);
    }
    return deletedOrder;
  } catch (error) {
    throw new Error("Error deleting order: " + error.message);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
