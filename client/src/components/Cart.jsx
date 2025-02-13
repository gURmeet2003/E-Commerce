import React, { useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { instance } from "../common";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartitem, updateCartQuantity, cartquantity, setCartquantity, auth } =
    useAuth();

  const handleAddToCart = async (product) => {
    console.log(product);
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

  const handleReduceCartItem = async (product) => {
    console.log(product);
    console.log("Before: ", product.quantity);
    product.quantity -= 1;
    console.log("After: ", product.quantity);
    try {
      console.log(product.productId);
      const response = await instance.post(
        `/auth/reduce-from-cart/${product._id}`,
        { productId: product._id, userId: auth.user._id },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        updateCartQuantity();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Shopping Cart</h2>
      {cartitem.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartitem.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <img
                src={item.productImage[0]}
                alt={item.productName}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-600">Brand: {item.brandName}</p>
                <p className="text-gray-900 font-bold">Price: ₹{item.price}</p>
                {/* Quantity Selector */}
                <div className="flex items-center mt-2 space-x-3">
                  <button
                    onClick={() => handleReduceCartItem(item)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <p className="text-lg font-medium">{item.quantity}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>

                {/* <button className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                  Remove
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty 🛒
        </div>
      )}
    </div>
  );
};

export default Cart;
