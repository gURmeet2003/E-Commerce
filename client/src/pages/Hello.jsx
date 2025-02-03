import React, { useEffect, useState } from "react";
import { instance } from "../common"; // Axios instance
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";

const Hello = () => {
  const [msg, setMsg] = useState("Loading..."); // Initial message for better UX
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Auth Token:", auth.token);
      try {
        const response = await instance.get("/auth/hello", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.status === 200) {
          setMsg(response.data.message);
        }
      } catch (e) {
        if (e.response) {
          toast.error(e.response.data.message || "An error occurred");
        } else {
          setMsg("Something went wrong");
          toast.error("Something went wrong");
        }
      }
    };

    fetchData();
  }, [auth.token]);

  return <div>{msg}</div>;
};

export default Hello;
