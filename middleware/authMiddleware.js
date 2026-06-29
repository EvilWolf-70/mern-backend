import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log(req.user);
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
};
