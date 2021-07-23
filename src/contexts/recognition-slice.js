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
          {
            original: "ORIGINAL",
            translated: "TRANSLATED",
            fontColor: "#000000",
            fontSize: 15,
            fontFamily: "Open Sans",
            fontWeight: "normal",
            fontStyle: "normal",
          },
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
      state.bboxText[action.payload.index] = {
        ...state.bboxText[action.payload.index],
        ...action.payload.text,
      };
    },

    setImageProperty: (state, action) => {
      const heightRatio =
        action.payload.clientHeight / state.imgProperty.clientHeight;
      const widthRatio =
        action.payload.clientWidth / state.imgProperty.clientWidth;

      function resizeBboxList(bboxList) {
        return bboxList.map((bbox) =>
          bbox.map((value, index) =>
            index % 2
              ? Math.round(value * widthRatio)
              : Math.round(value * heightRatio)
          )
        );
      }

      state.bboxText = state.bboxText.map((textStyle) => ({
        ...textStyle,
        fontSize: Math.round(textStyle.fontSize * widthRatio),
      }));
      state.bboxList = resizeBboxList(state.bboxList);
      state.translationList = resizeBboxList(state.translationList);
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
  setImageProperty,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
