import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: [],
  translationList: [],
};

export const recognitionSlice = createSlice({
  name: "recognition",
  initialState,
  reducers: {
    createBbox: (state, action) => {
      if (action.payload[0]) {
        state.bboxList = [...state.bboxList, action.payload];
        state.translationList = [...state.translationList, action.payload];
      }
    },

    deleteAll: (state) => {
      state.bboxList = [];
      state.translationList = [];
    },

    updateLocation: (state, action) => {
      const index = action.payload[1];

      if (action.payload[0]) {
        state.bboxList[index][0] = action.payload[2][0];
        state.bboxList[index][1] = action.payload[2][1];
      } else {
        state.translationList[index][0] = action.payload[2][0];
        state.translationList[index][1] = action.payload[2][1];
      }
    },

    updateSize: (state, action) => {
      const index = action.payload[1];

      if (action.payload[0]) {
        state.bboxList[index][2] = action.payload[2][0];
        state.bboxList[index][3] = action.payload[2][1];
      } else {
        state.translationList[index][2] = action.payload[2][0];
        state.translationList[index][3] = action.payload[2][1];
      }
    },
  },
});

export const { createBbox, deleteAll, updateLocation, updateSize } =
  recognitionSlice.actions;

export default recognitionSlice.reducer;
