import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id != action.payload);
    },
  },
});

export const { setUserDetails, addToCart, removeCartItem } = userSlice.actions;

export default userSlice.reducer;
