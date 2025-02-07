import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { instance } from "../common";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [category] = useState([
    { id: 1, label: "Airpods", value: "airpods" },
    { id: 2, label: "Phones", value: "phones" },
  ]);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    description: "",
    price: "",
    selling: "",
  });

  // Fetch existing product data
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await instance.get(`/auth/get-single-product/${id}`);
          if (response.status === 200) {
            setData(response.data.data);
          }
        } catch (e) {
          toast.error(e.response?.data?.message || "Error fetching product");
        }
      };
      fetchProduct();
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/auth/update-product/${id}`, data); // Fix `req.params.id`

      if (response.status === 200) {
        toast.success("Product updated successfully!");
        setData(response.data.data); // Ensure updated data is set
      }
    } catch (e) {
      console.log("Error in updating the product", e);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg border-4 border-black p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold">Update Product</h2>
        <IoClose
          className="text-xl cursor-pointer hover:text-red-600"
          onClick={() => setDisplayUpload(false)}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-medium">Product Name:</label>
          <input
            name="productName"
            value={data.productName}
            onChange={handleChange}
            type="text"
            placeholder="Enter product name"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Brand Name */}
        <div className="flex flex-col">
          <label className="font-medium">Brand Name:</label>
          <input
            name="brandName"
            value={data.brandName}
            onChange={handleChange}
            type="text"
            placeholder="Enter brand name"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="font-medium">Category:</label>
          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a category</option>
            {category.map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium">Description</label>
          <input
            name="description"
            value={data.description}
            onChange={handleChange}
            type="text"
            placeholder="Enter product description"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-medium">Original Price</label>
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter original price"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Selling Price */}
        <div className="flex flex-col">
          <label className="font-medium">Selling Price</label>
          <input
            name="selling"
            value={data.selling}
            onChange={handleChange}
            type="number"
            placeholder="Enter selling price"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
