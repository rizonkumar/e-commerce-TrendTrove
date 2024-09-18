import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const orderRouter = express.Router();

// Admin Features
orderRouter.get("/allOrders", adminAuth, allOrders);
orderRouter.put("/updateStatus", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/placeOrder", authMiddleware, placeOrder);
orderRouter.post("/placeOrderStripe", authMiddleware, placeOrderStripe);
orderRouter.post("/placeOrderRazorpay", authMiddleware, placeOrderRazorpay);

// User Features
orderRouter.get("/userOrder", authMiddleware, userOrders);

export default orderRouter;
