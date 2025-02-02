import { Product } from "../../models/product_model.js";

export const uploadproductController = async (req, res) => {
  try {
    await new Product(req.body).save();
    return res
      .status(200)
      .json({ message: "product uploaded successfully", success: true });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "error in uploading the product", success: false });
  }
};
