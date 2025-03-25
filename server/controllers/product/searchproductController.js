export const searchproductController = async (req, res) => {
  try {
    const search = req.query.search || "";
    let filter = {};

    if (search.trim()) {
      filter = { name: { $regex: search, $options: "i" } };
    }

    const data = await Product.find(filter);
    return res.status(200).json({ data, success: true });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Error fetching products", success: false });
  }
};
