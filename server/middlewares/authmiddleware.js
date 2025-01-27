import jwt from "jsonwebtoken";
import { User } from "../models/user_model.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    console.log(e);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};
