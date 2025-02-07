import { Product } from "../../models/product_model.js";

export const updateproductbyidController = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-productImage");

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      data: updatedProduct,
      message: "Product Updated Successfully",
      success: true, // ✅ Fix: Set success to true
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Error updating the product",
      success: false,
    });
  }
};
