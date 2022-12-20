import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      let newCart = [...state.items];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the cart`
        );
      }
      state.items = newCart;
    },
    emptyCart: (state) => {
      state.items = [];
    },

    changeCartAmount: (state, action, amountX) => {
      let index = state.items.findIndex((item) => item.id == action.payload.id);
      // index.amount = amountX;
      // console.log("************************************");
      // console.log(index);
      // console.log("************************************");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart, changeCartAmount } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsWithId = (state, id) =>
  state.cart.items.filter((item) => item.id == id);

export const selectCartPointsTotal = (state, id) =>
  state.cart.items.reduce((total, item) => (total += item.estimateTotal), 0);

export default cartSlice.reducer;
