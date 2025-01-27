import React, { useState } from "react";
import { LuCircleUser } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { instance } from "../../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/signin", {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        toast.success(response.data.message);
        navigate("/");
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

  return (
    <div className="flex p-5 items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex relative rounded-2xl flex-col items-center p-6 bg-blue-400 shadow-lg"
      >
        <LuCircleUser className="m-4 text-9xl" />
        <h4 className="text-2xl text-white mb-2">Email</h4>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={data.email}
          className="rounded-full  outline-none m-4 p-2 w-60 text-center"
          placeholder="abc@gmail.com"
        />
        <h4 className="text-2xl text-white mb-2">Password</h4>
        <div className="relative flex items-center">
          <input
            value={data.password}
            onChange={handleChange}
            name="password"
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
        <Link
          to={"/forgot_password"}
          className="absolute bottom-[7.5rem] left-[2.5rem] text-green-400"
        >
          Forgot Password ?
        </Link>
        <button className="bg-red-500 m-2 w-24 text-white p-2 rounded-full hover:bg-red-400 mt-4">
          Login
        </button>
        <p className="m-2">
          Don't have account ?
          <Link className="text-1xl px-2 text-yellow-400" to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
