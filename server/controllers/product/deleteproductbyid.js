import { Product } from "../../models/product_model.js";

export const deleteproductbyidController = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not deleted",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully",
      success: true, // ✅ Fix: Set success to true
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Error deleting the product",
      success: false,
    });
  }
};
