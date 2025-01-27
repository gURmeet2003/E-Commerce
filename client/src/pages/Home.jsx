import React, { useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/userSlice";

const Home = () => {
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(setUserDetails(auth.user));
  }, [auth]);
  return (
    <>
      {JSON.stringify(auth, null, 4)}
      <h1>Hello,{user?.name}</h1>
    </>
  );
};

export default Home;
