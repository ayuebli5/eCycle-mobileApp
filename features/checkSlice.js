import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: "0",
};

export const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    setCheckRedux: (state, action) => {
      state.items = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckRedux } = checkSlice.actions;

export const checkRedux = (state) => state.check.items;

export default checkSlice.reducer;
