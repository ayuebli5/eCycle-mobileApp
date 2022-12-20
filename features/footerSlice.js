import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: "Home",
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setActiveTabRedux: (state, action) => {
      state.items = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveTabRedux } = footerSlice.actions;

export const activeTabRedux = (state) => state.footer.items;

export default footerSlice.reducer;
