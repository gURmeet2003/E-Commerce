import React, { useState } from "react";
import signinGif from "../../assest/signin.gif";
import UploadProduct from "../../components/UploadProduct";

const AdminPanel = () => {
  const [displayUpload, setDisplayUpload] = useState(false);
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
      </div>
      {displayUpload && <UploadProduct setDisplayUpload={setDisplayUpload} />}
    </div>
  );
};

export default AdminPanel;
