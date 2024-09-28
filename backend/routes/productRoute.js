import express from "express";
import {
  addProduct,
  getAllProducts,
  removeProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const productRouter = express.Router();

// Route to add a new product
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Public route for all users (no auth required)
productRouter.get("/all", getAllProducts);

// Protected route (requires authentication)
productRouter.get("/user", authMiddleware, getAllProducts);

// Route to remove a product
productRouter.delete("/remove", adminAuth, removeProduct);

// Route to get a single product
productRouter.post("/single", adminAuth, getSingleProduct);

// Admin route
productRouter.get("/admin/products", adminAuthMiddleware, getAllProducts);

// Route to update a product
productRouter.put(
  "/update",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

export default productRouter;
