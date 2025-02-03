import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { instance } from "../common";
import { useAuth } from "../context/authcontext";
import { toast } from "react-toastify";

const UploadProduct = ({ setDisplayUpload }) => {
  const [auth] = useAuth();

  const [category] = useState([
    { id: 1, label: "Airpods", value: "airpods" },
    { id: 2, label: "Phones", value: "phones" },
  ]);

  const [previewImages, setPreviewImages] = useState([]);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  };

  // Handle image selection and preview
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mern_product"); // Replace with your Cloudinary preset
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          formData, // ✅ Pass `formData` directly
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return response.data.secure_url; // Cloudinary URL
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const imageUrls = (await Promise.all(uploadPromises)).filter((url) => url); // Remove null values

    setPreviewImages((prevImages) => [...prevImages, ...imageUrls]); // ✅ Update previews
    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, ...imageUrls], // ✅ Store Cloudinary URLs
    }));
  };

  // Remove an image from preview
  const removeImage = (index) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setData((prevData) => ({
      ...prevData,
      productImage: prevData.productImage.filter((_, i) => i !== index),
    }));
  };

  // Upload Product

  const handleUpload = async () => {
    try {
      const response = await instance.post(
        "/auth/upload-product", // Ensure this matches your backend route
        data, // Data should be the first argument
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      setData({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: "",
      });

      setPreviewImages([]);
    } catch (e) {
      console.log("error in upload", e.response || e.message);
      toast.error("Failed to upload product");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg border-4 border-black p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold">Upload Product</h2>
        <IoClose
          className="text-xl cursor-pointer hover:text-red-600"
          onClick={() => setDisplayUpload(false)}
        />
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mt-4">
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
            value={data.category}
            onChange={handleCategoryChange}
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

        {/* Product Image Upload */}
        <div className="flex flex-col">
          <label className="font-medium">Product Images:</label>
          <label
            htmlFor="file-upload"
            className="h-[10rem] flex flex-col items-center justify-center border border-gray-500 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <FaCloudUploadAlt className="text-4xl text-gray-600" />
            <p className="text-gray-600">Click to Upload</p>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Image Previews with Remove Option */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-start">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="Preview"
                  className="h-16 w-16 rounded-md shadow-md border"
                />
                <IoClose
                  className="absolute -top-2 -right-2 text-red-600 bg-white rounded-full cursor-pointer"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
          </div>
        )}

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

        {/* Selling */}
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

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium">Original Price</label>
          <input
            name="description"
            value={data.description}
            onChange={handleChange}
            type="text"
            placeholder="Enter product description"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Upload Product
        </button>
      </div>
    </div>
  );
};

export default UploadProduct;
