import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../common";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || { user: null, token: "" }
  );
  const [cartquantity, setCartquantity] = useState(0);

  // Function to fetch and update cart quantity
  const updateCartQuantity = async () => {
    if (!auth?.user?._id) {
      setCartquantity(0);
      return;
    }
    try {
      const response = await instance.get(
        `/auth/find-item-by-id/${auth.user._id}`
      );
      if (response.status === 200) {
        setCartquantity(response.data.totalquantity);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (auth.user) updateCartQuantity();
  }, [auth.user]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cartquantity,
        setCartquantity,
        updateCartQuantity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
