import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToHistory } = historySlice.actions;

export const selectHistoryItems = (state) => state.history.items;

export const selectHistoryItemsWithId = (state, id) =>
  state.history.items.filter((item) => item.id == id);

export const selectHistoryPointsTotal = (state) =>
  state.history.items.reduce((total, item) => (total += item.estimateTotal), 0);

export default historySlice.reducer;
