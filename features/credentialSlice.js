import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const credentialSlice = createSlice({
  name: "credential",
  initialState,
  reducers: {
    addToCredential: (state, action) => {
      state.items = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCredential } = credentialSlice.actions;

export const selectCredential = (state) => state.credential.items;

export default credentialSlice.reducer;
