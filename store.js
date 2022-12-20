import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import cartReducer from "./features/cartSlice";
import historyReducer from "./features/historySlice";
import credentialReducer from "./features/credentialSlice";
import footerReducer from "./features/footerSlice";
import checkReducer from "./features/checkSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    cart: cartReducer,
    history: historyReducer,
    credential: credentialReducer,
    footer: footerReducer,
    check: checkReducer,
  },
});
