import express from "express";
import {
  addProductToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/cartAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add-product", authUser, addProductToCart);
cartRouter.post("/get-user-cart", authUser, getUserCart);
cartRouter.post("/update-cart", authUser, updateCart);

export default cartRouter;
