import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { CreateProduct, getProducts } from '../controller/product.controller.js';

const productRoute=express.Router();

productRoute.get('/get-products',protectRoute,getProducts);
productRoute.post('/create-products',CreateProduct);
export default productRoute;