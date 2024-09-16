import express from 'express';
import { addProduct, getAllProducts, removeProduct, getSingleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route to add a new product
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProduct);

// Route to get all products
productRouter.get('/all',adminAuth, getAllProducts);

// Route to remove a product
productRouter.delete('/remove',adminAuth, removeProduct);

// Route to get a single product
productRouter.post('/single',adminAuth, getSingleProduct);

export default productRouter;
