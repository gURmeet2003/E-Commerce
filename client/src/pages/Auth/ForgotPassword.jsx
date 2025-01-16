import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const ForgotPassword = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex p-5 items-center justify-center min-h-screen bg-gray-100">
      <form className="flex relative rounded-2xl flex-col items-center p-6 bg-blue-400 shadow-lg">
        <h4 className="text-2xl text-white mb-2">Email</h4>
        <input
          type="text"
          className="rounded-full  outline-none m-4 p-2 w-60 text-center"
          placeholder="abc@gmail.com"
        />
        <h4 className="text-2xl text-white mb-2">Password</h4>
        <div className="relative flex items-center">
          <input
            className="rounded-full m-4 p-2 w-60 text-center outline-none"
            type={visible ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-10 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>

        <button className="bg-red-500 w-24 text-white p-2 rounded-full hover:bg-red-400 mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
