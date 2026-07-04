import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

  const router = express.Router();

router.post("/", protect, createOrder);

router.get("/ ", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.get("/", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
