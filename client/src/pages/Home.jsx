import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { instance } from "../common";
import { toast } from "react-toastify";

const Home = () => {
  const { auth, updateCartQuantity } = useAuth();
  const [allproduct, setAllproduct] = useState([]);

  const handleAddToCart = async (product) => {
    try {
      const response = await instance.post(
        "/auth/add-to-cart",
        {
          productId: product._id,
          userId: auth.user._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        updateCartQuantity(); // <-- Update cart count after adding an item
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAllProduct = async () => {
    try {
      const response = await instance.get("/auth/all-product");
      if (response.status === 200) {
        setAllproduct(response.data.data);
      }
    } catch (e) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome, {auth?.user?.name || "Guest"}
      </h1>

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
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-red-500 p-2 rounded-full text-white"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
