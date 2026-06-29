import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/', protect, admin).get(getProducts).post(createProduct)

router.route('/:id', protect,  admin,).put(updateProduct).delete(deleteProduct)
export default router