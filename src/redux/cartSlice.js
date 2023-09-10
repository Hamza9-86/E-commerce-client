import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const products = action.payload.attributes;
      const currItem = products
        ? {
            title: products.title,
            key: products.key,
            price: products.price,
            image: products.image.data.attributes.url,
          }
        : action.payload;

      const index = state.cart.findIndex((item) => item.key === currItem.key);
      if (index == -1) {
        state.cart.push({ ...currItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },

    removeFromCart: (state, action) => {
      const currKey = action.payload.attributes?.key || action.payload.key;
      const index = state.cart.findIndex((item) => item.key === currKey);
      if (index === -1) return; //cart empty h to decrement nhi hoga
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item.key !== currKey);
      } else {
        state.cart[index].quantity -= 1;
      }
    },

    removeItem: (state , action) => {
      const currKey = action.payload.attributes?.key || action.payload.key;
      state.cart = state.cart.filter((item) => item.key !== currKey);
    },

    resetCart : (state , action) => {
      state.cart = []
    }
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart , removeItem, resetCart}  = cartSlice.actions;
