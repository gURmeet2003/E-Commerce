import React, { useEffect, useState } from "react";
import { LuChartNoAxesColumnIncreasing, LuCircleUser } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useActionData, useNavigate } from "react-router-dom";
import { instance } from "../../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.response.data.message);
      }
    }
    console.log(data);
  };

  const handlePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, profilepic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex relative rounded-2xl flex-col items-center p-6 bg-blue-400 shadow-lg"
      >
        <div className="relative flex justify-around">
          {data.profilepic ? (
            <img
              className="h-[8rem] rounded-full w-[8rem]"
              src={data.profilepic}
              alt="profile"
            />
          ) : (
            <LuCircleUser className="m-4 text-9xl size-[8rem]" />
          )}
          <label className="bg-slate-200 absolute bottom-0 p-2">
            Upload Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePic}
            />
          </label>
        </div>

        <h4 className="text-2xl text-white mb-2">Name</h4>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={data.name}
          className="rounded-full  outline-none m-2 p-2 w-60 text-center"
          placeholder="abc"
        />
        <h4 className="text-2xl text-white mb-2">Email</h4>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={data.email}
          className="rounded-full  outline-none m-2 p-2 w-60 text-center"
          placeholder="abc@gmail.com"
        />
        <h4 className="text-2xl text-white mb-2">Password</h4>
        <div className="relative flex items-center">
          <input
            value={data.password}
            onChange={handleChange}
            name="password"
            className="rounded-full m-2 p-2 w-60 text-center outline-none"
            type={visible ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            onClick={() => setVisible(!visible)}
            className="absolute right-5 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>

        <button className="bg-red-500 m-2 w-24 text-white p-2 rounded-full hover:bg-red-400 mt-4">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
