import express from "express";
import { user_signup } from "../controllers/user/signup.js";
import { user_signin } from "../controllers/user/signin.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { uploadproductController } from "../controllers/product/uploadproduct.js";
import { getallproductController } from "../controllers/product/getallproduct.js";

export const router = express.Router();

//user routes
router.post("/signup", user_signup);
router.post("/signin", user_signin);
router.get("/hello", requireSignIn, isAdmin, (req, res) => {
  return res.status(200).json({ message: "Hello Gurmeet", success: true });
});

//admin routes

//product routes
router.get("/all-product", getallproductController);
router.post("/upload-product", requireSignIn, isAdmin, uploadproductController);
