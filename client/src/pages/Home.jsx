// import React, { useEffect } from "react";
// import { useAuth } from "../context/authcontext";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserDetails } from "../redux/userSlice";

// const Home = () => {
//   const [auth] = useAuth();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   useEffect(() => {
//     dispatch(setUserDetails(auth.user));
//   }, [auth]);
//   return (
//     <>
//       {JSON.stringify(auth, null, 4)}
//       <h1>Hello,{user?.name}</h1>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { instance } from "../common";
import { toast } from "react-toastify";

const Home = () => {
  const [auth] = useAuth();
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
