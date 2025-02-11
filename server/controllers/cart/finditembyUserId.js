import { Cart } from "../../models/cart_model.js";

export const finditembyUserIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const cartItems = await Cart.find({ userId });

    if (cartItems.length > 0) {
      const totalquantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return res
        .status(200)
        .json({ totalquantity: totalquantity, data: cartItems, success: true });
    }

    return res
      .status(404)
      .json({ message: "No items found for this user", success: false });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
