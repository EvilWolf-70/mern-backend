import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors())
// MiddleWare
app.use(express.json());

// app.json();
connectDB();

const PORT = process.env.PORT;


//get All Users

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      length: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`server is running  http://localhost:${PORT}/`);
});
