import { Cart } from "../../models/cart_model.js";
import { Product } from "../../models/product_model.js";

export const addtocartController = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity ? quantity : 1;
      await existingCartItem.save();
    } else {
      existingCartItem = await Cart.create({
        productId,
        userId,
        quantity: quantity ? quantity : 1,
      });
    }

    res
      .status(200)
      .json({ message: "Product added to cart", cartItem: existingCartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
