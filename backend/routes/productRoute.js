import express from 'express';
import { addProduct, getAllProducts, removeProduct, getSingleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

// Route to add a new product
productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProduct);

// Route to get all products
productRouter.get('/all', getAllProducts);

// Route to remove a product
productRouter.delete('/remove', removeProduct);

// Route to get a single product
productRouter.get('/single', getSingleProduct);

export default productRouter;
