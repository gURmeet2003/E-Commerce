import { Cart } from "../../models/cart_model.js";
import { Product } from "../../models/product_model.js";

export const reducefromcartController = async (req, res) => {
  try {
    const { productId, userId } = req.body; // Expect productId and userId from request body

    if (!productId || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    // Find the cart item
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (!existingCartItem) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", success: false });
    }

    // Reduce quantity or remove item if it reaches zero
    if (existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
      await existingCartItem.save();
      res.status(200).json({
        message: "Product quantity reduced",
        cartItem: existingCartItem,
      });
    } else {
      await Cart.deleteOne({ userId, productId });
      res.status(200).json({ message: "Product removed from cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
