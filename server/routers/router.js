import express from "express";
import { user_signup } from "../controllers/user/signup.js";
import { user_signin } from "../controllers/user/signin.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { uploadproductController } from "../controllers/product/uploadproduct.js";
import { getallproductController } from "../controllers/product/getallproduct.js";
import { getproductbyidController } from "../controllers/product/getproductbyid.js";
import { updateproductbyidController } from "../controllers/product/updateproductbyid.js";
import { deleteproductbyidController } from "../controllers/product/deleteproductbyid.js";
import { addtocartController } from "../controllers/cart/addtocart.js";
import { finditembyUserIdController } from "../controllers/cart/finditembyUserId.js";

export const router = express.Router();

//user routes
router.post("/signup", user_signup);
router.post("/signin", user_signin);
router.get("/hello", requireSignIn, isAdmin, (req, res) => {
  return res.status(200).json({ message: "Hello Gurmeet", success: true });
});

//admin routes
router.get("/all-product", getallproductController);
router.post("/upload-product", requireSignIn, isAdmin, uploadproductController);
router.get("/get-single-product/:id", getproductbyidController);
router.put("/update-product/:id", updateproductbyidController);
router.delete("/delete-product/:id", deleteproductbyidController);

//cart
router.post("/add-to-cart", requireSignIn, addtocartController);
router.get("/find-item-by-id/:id", finditembyUserIdController);
