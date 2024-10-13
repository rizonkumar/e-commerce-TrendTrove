import express from "express";
import {
  addProductToCart,
  getUserCart,
  mergeCarts,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/cartAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add-product", authUser, addProductToCart);
cartRouter.post("/get-user-cart", authUser, getUserCart);
cartRouter.post("/update-cart", authUser, updateCart);
cartRouter.post("/merge", authUser, mergeCarts);
cartRouter.use("/api/cart", cartRouter);

export default cartRouter;
