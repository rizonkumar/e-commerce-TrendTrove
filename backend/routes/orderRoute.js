import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  getOrderDetails,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder", authMiddleware, (req, res, next) => {
  placeOrder(req, res, next);
});

orderRouter.post("/placeOrderStripe", authMiddleware, placeOrderStripe);
orderRouter.post("/placeOrderRazorpay", authMiddleware, placeOrderRazorpay);
orderRouter.get("/userOrder", authMiddleware, userOrders);
orderRouter.get("/allOrders", adminAuth, allOrders);
orderRouter.put("/updateStatus", adminAuth, updateStatus);
orderRouter.get("/:orderId", authMiddleware, getOrderDetails);
export default orderRouter;
