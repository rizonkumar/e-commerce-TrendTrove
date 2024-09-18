import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel";

// Placing order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethode: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", sucess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, sucess: false });
  }
};

// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {};

// Placing order using razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// All orders data for admin panel
const allOrders = async (req, res) => {};

// User Order data for frontend
const userOrders = async (req, res) => {};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
