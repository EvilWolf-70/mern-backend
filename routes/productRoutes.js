import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// AFTER (correct — middleware runs properly)
router.route('/')
  .get( getProducts)          // anyone logged in can view
  .post(protect, admin, createProduct) // only admin can create

router.route('/:id')
  .put(protect, admin, updateProduct)    // only admin can update
  .delete(protect, admin, deleteProduct) // only admin can delete
export default router