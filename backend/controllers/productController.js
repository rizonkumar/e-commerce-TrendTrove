import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Storing the images in the cloudinary
    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res
      .status(200)
      .json({ message: "Product added successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      products,
      success: true,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// Function to remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// Function to get single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({
      product,
      success: true,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    let updateData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: sizes.split(",").map((size) => size.trim()),
      bestseller: bestseller === "true",
    };

    // Only process images if new ones are uploaded
    if (image1 || image2 || image3 || image4) {
      const images = [image1, image2, image3, image4].filter(
        (image) => image !== undefined
      );
      let imagesUrl = await Promise.all(
        images.map(async (image) => {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      updateData.image = imagesUrl;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};
export {
  addProduct,
  getAllProducts,
  removeProduct,
  getSingleProduct,
  updateProduct,
};
