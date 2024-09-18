import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { products } from "../assets/assets.js";
import Product from "../models/productModel.js";
import fs from "fs/promises";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Check if environment variables are loaded
console.log("MongoDB URL:", process.env.MONGODB_URL);
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

const checkAssetsFolder = async () => {
  const assetsPath = path.join(__dirname, "..", "assets");
  try {
    await fs.access(assetsPath);
    console.log(`Assets folder found at: ${assetsPath}`);
  } catch (error) {
    console.error(`Assets folder not found at: ${assetsPath}`);
    process.exit(1);
  }
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

const importData = async () => {
  try {
    await checkAssetsFolder();
    await connectDB();
    console.log("Starting data import...");

    await Product.deleteMany();
    console.log("Cleared existing products");

    for (let product of products) {
      console.log(`Processing product: ${product.name}`);
      const imageUrls = [];
      for (let imageName of product.image) {
        const fullImagePath = path.join(__dirname, "..", "assets", imageName);
        console.log(`Checking image: ${fullImagePath}`);

        try {
          // Check if file exists
          await fs.access(fullImagePath);
          console.log(`Uploading image: ${fullImagePath}`);

          // Upload image to Cloudinary
          const result = await cloudinary.uploader.upload(fullImagePath, {
            folder: "products",
          });
          imageUrls.push(result.secure_url);
          console.log(`Image uploaded successfully: ${result.secure_url}`);
        } catch (error) {
          if (error.code === "ENOENT") {
            console.error(`File not found: ${fullImagePath}`);
          } else {
            console.error(`Error processing image ${fullImagePath}:`, error);
          }
        }
      }

      // Convert string _id to ObjectId
      const productData = {
        ...product,
        _id:
          product._id.length === 24
            ? new ObjectId(product._id)
            : new ObjectId(),
        image: imageUrls,
      };

      // Create new product with Cloudinary URLs
      const newProduct = new Product(productData);

      await newProduct.save();
      console.log(`Product saved: ${newProduct.name}`);
    }

    console.log("Data import completed successfully");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

importData().catch((error) => {
  console.error("Error calling importData:", error);
  process.exit(1);
});
