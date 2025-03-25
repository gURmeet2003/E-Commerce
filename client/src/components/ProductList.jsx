import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../common";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search") || "";
        const res = await instance.get(
          `/auth/search-product?search=${searchQuery}`
        );

        if (res.status === 200) {
          setProducts(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchProducts();
  }, [location.search]); // Re-run when search query changes

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => <div key={product._id}>{product.name}</div>)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
