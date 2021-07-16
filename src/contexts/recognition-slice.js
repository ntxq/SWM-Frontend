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

    updateLocation: (state, action) => {
      const index = action.payload[0];
      state.bboxList[index][0] = action.payload[1][0];
      state.bboxList[index][1] = action.payload[1][1];
    },
  },
});

export const { createBbox, deleteAll, updateLocation } =
  recognitionSlice.actions;

export default recognitionSlice.reducer;
