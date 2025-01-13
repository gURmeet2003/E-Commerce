import React from "react";
import { CiSearch } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between h-14 p-3 bg-gray-400">
      <Logo h={65} w={65} alt="Company Logo" />

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
          className="flex items-center justify-center h-8 w-8 text-gray-700 hover:text-red-500"
        >
          <LuCircleUser className="h-6 w-6" />
        </button>
        <button
          aria-label="Shopping Cart"
          className="flex items-center justify-center h-8 w-8 text-gray-700 hover:text-red-500"
        >
          <FaShoppingCart className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/login")}
          className="rounded-full bg-red-500 text-white px-4 py-1 hover:bg-red-600 transition duration-400"
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
