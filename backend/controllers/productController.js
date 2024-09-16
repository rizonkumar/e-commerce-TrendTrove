import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Storing the images in the cloudinary
        const images = [image1, image2, image3, image4].filter(image => image !== undefined);
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );
        const productData = {name, price: Number(price), description, category, subCategory, sizes: JSON.parse(sizes), bestseller: bestseller === "true" ? true : false, image: imagesUrl, date: Date.now()}

        const product = new productModel(productData);
        await product.save();
        res.status(200).json({ message: "Product added successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false, error: error });
    }
}

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ products, success: true, message: "All products fetched successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
 }

// Function to remove product
const removeProduct = async (req, res) => {
    console.log("cccc")
    try {
        await productModel.findByIdAndDelete(req.body.id);
        console.log("dddd")
        res.status(200).json({success: true, message: "Product removed successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
 }

// Function to get single product
const getSingleProduct = async (req, res) => { }

export { addProduct, getAllProducts, removeProduct, getSingleProduct };
