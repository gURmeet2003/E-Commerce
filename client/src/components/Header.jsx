import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { toast } from "react-toastify";
//import { useSelector } from "react-redux";
import { instance } from "../common";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const isLoggedIn = Boolean(auth.token);
  const [cartquantity, setCartquantity] = useState(0);
  // const cart = useSelector((state) => state.user.cart);

  // const totalCartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = (e) => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    toast.success("Logout Successful");
  };

  const handlecartquantity = async () => {
    try {
      const response = await instance.get(
        `/auth/find-item-by-id/${auth.user._id}`
      );

      if (response.status === 200) {
        setCartquantity(response.data.totalquantity);
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error(e.response.data.message);
      } else {
        console.log(e);
        toast.error(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    handlecartquantity();
  }, [auth.user]);
  return (
    <header className="flex items-center justify-between h-14 p-3 bg-gray-400">
      <Link to={"/"}>
        <Logo h={65} w={65} alt="Company Logo" />
      </Link>
      <div className="hidden lg:flex items-center rounded-full border border-black">
        <input
          className="h-7 rounded-l-full p-2 text-sm text-gray-700 outline-none placeholder-gray-500"
          type="text"
          placeholder="Search product here..."
          aria-label="Search product"
        />
        <CiSearch
          className="bg-red-500 h-7 w-7 text-white p-1 rounded-r-full cursor-pointer"
          aria-label="Search"
        />
      </div>

      <nav className="flex items-center space-x-4 md:space-x-6">
        <button
          aria-label="User Profile"
          className="flex items-center justify-center h-8 w-8 text-gray-700 "
        >
          <LuCircleUser className="h-6 w-6" />
        </button>
        <Link to={"/cart"}>
          <button
            aria-label="Shopping Cart"
            className="flex items-center justify-center h-8 w-8 text-gray-700 "
          >
            <span className="relative">
              <FaShoppingCart className="h-6 w-6" />
              <span className="absolute h-5 w-5 flex font-bold items-center text-white top-[-8px] right-[-8px] bg-red-500 rounded-full justify-around ">
                {cartquantity}
              </span>
            </span>
          </button>
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 text-white px-4 py-1 hover:bg-red-600 transition duration-400"
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="rounded-full bg-red-500 text-white px-4 py-1 hover:bg-red-600 transition duration-400">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
