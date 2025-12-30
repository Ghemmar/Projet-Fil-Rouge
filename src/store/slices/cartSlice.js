import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  items: savedCart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);

      if (product && quantity > 0) {
        product.quantity = quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: state => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
