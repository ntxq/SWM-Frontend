import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: [],
  translationList: [],
  activeBox: undefined,
  bboxText: [],
  imgProperty: {
    clientHeight: undefined,
    clientWidth: undefined,
    naturalHeight: undefined,
    naturalWidth: undefined,
  },
};

export const recognitionSlice = createSlice({
  name: "recognition",
  initialState,
  reducers: {
    createBbox: (state, action) => {
      if (action.payload[0]) {
        state.bboxList = [...state.bboxList, action.payload];
        state.translationList = [...state.translationList, action.payload];
        state.bboxText = [
          ...state.bboxText,
          ["ORIGINAL", "TRANSLATED", "#000000", 15],
        ];
      }
    },

    deleteBox: (state, action) => {
      if (action.payload === undefined) {
        state.bboxList = [];
        state.translationList = [];
        state.bboxText = [];
        state.activeBox = undefined;
      } else {
        state.bboxList = state.bboxList.filter(
          (value, index) => index !== action.payload
        );
        state.translationList = state.translationList.filter(
          (value, index) => index !== action.payload
        );
        state.bboxText = state.bboxText.filter(
          (value, index) => index !== action.payload
        );
        state.activeBox = undefined;
      }
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

    selectBox: (state, action) => {
      state.activeBox = action.payload;
    },

    updateText: (state, action) => {
      if (action.payload.original) {
        state.bboxText[action.payload.index][0] = action.payload.text;
      } else {
        state.bboxText[action.payload.index][1] = action.payload.text;
      }
    },

    updateStyle: (state, action) => {
      if (action.payload.color)
        state.bboxText[action.payload.index][2] = action.payload.color;
      else state.bboxText[action.payload.index][3] = action.payload.size;
    },

    setImageProperty: (state, action) => {
      state.imgProperty = action.payload;
    },
  },
});

export const {
  createBbox,
  deleteBox,
  updateLocation,
  updateSize,
  selectBox,
  updateText,
  updateStyle,
  setImageProperty,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
