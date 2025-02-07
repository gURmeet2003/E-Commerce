import { Product } from "../../models/product_model.js";

export const getproductbyidController = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).select("-productImage");
    return res.status(200).json({ data, success: true });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "error in uploading the product", success: false });
  }
};
