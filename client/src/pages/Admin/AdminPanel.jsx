import React, { useState, useEffect } from "react";
import signinGif from "../../assest/signin.gif";
import { toast } from "react-toastify";
import { instance } from "../../common";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import UploadProduct from "../../components/UploadProduct";

const AdminPanel = () => {
  const [displayUpload, setDisplayUpload] = useState(false);

  const [allproduct, setAllproduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await instance.get("/auth/all-product");
      if (response.status === 200) {
        setAllproduct(response.data.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 500) {
        toast.error("Error fetching products");
      }
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [allproduct]);

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <div className="w-[25%] bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col items-center">
        <img
          className="h-16 w-16 rounded-full border-2 border-white"
          src={signinGif}
          alt="Admin"
        />
        <h2 className="mt-2 text-lg font-semibold">Gurmeet Raj</h2>
        <span className="text-gray-700">Admin</span>

        {/* Menu */}
        <div className="mt-6 w-full flex flex-col gap-3">
          <button className="p-2 w-full text-center bg-yellow-400 hover:bg-yellow-500 rounded-md transition duration-300">
            All Users
          </button>
          <button className="p-2 w-full text-center bg-yellow-400 hover:bg-yellow-500 rounded-md transition duration-300">
            All Products
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[75%] border-4 border-black bg-white rounded-lg shadow-md p-6 mx-4 flex flex-col justify-between items-center">
        <div className="flex w-[100%] justify-between">
          <h2 className="text-xl border-4 border-black font-semibold ">
            All Products
          </h2>
          <button
            onClick={() => setDisplayUpload(true)}
            className="bg-red-500 border-4 border-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Upload Product
          </button>
        </div>
        {allproduct.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allproduct.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  className="h-48 w-48 object-cover rounded-md"
                  src={product.productImage}
                  alt={product.productName}
                />
                <h2 className="text-lg font-semibold mt-4">
                  {product.productName}
                </h2>
                <p className="text-gray-600">Brand: {product.brandName}</p>
                <p className="text-green-600 font-bold">${product.selling}</p>
                <Link to={`/update-product/${product._id}`}>
                  <CiEdit className="text-4xl cursor-pointer" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {displayUpload && <UploadProduct setDisplayUpload={setDisplayUpload} />}
    </div>
  );
};

export default AdminPanel;
