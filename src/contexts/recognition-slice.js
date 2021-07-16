import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: [],
};

export const recognitionSlice = createSlice({
  name: "recognition",
  initialState,
  reducers: {
    createBbox: (state, action) => {
      state.bboxList = [...state.bboxList, action.payload];
    },
    deleteAll: (state) => {
      state.bboxList = [];
    },
  },
});

export const { createBbox, deleteAll } = recognitionSlice.actions;

export default recognitionSlice.reducer;
