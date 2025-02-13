import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../common";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
  });
  const [cartitem, setCartItem] = useState([]);
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
      console.log(response.data.data);
      if (response.status === 200) {
        setCartquantity(response.data.totalquantity);
        setCartItem(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update localStorage whenever auth state changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

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
        cartitem,
        setCartItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
