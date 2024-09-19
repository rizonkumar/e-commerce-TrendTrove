import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing order using COD Method
const placeOrder = async (req, res) => {
  console.log("placeOrder function called");
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: true,
      status: "Payment Received",
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });
    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrderStripe:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: true,
      status: "Payment Received",
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });
    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .sort({ date: -1 })
      .populate("userId", "name email");
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error("Error in allOrders:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// User Order data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel
      .find({ userId })
      .sort({ date: -1 })
      .populate("items.productId", "name image price");
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error("Error in userOrders:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404);
      json({ message: "Order not found", success: false });
    }
    res.status(200).json({
      message: "Order status updated",
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Get single order details
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel
      .findById(orderId)
      .populate("items.productId", "name image price");
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    res.status(200).json({ order, success: true });
  } catch (error) {
    console.error("Error in getOrderDetails:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  getOrderDetails,
};
