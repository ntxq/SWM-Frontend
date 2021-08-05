import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: {},
  activeBox: undefined,
  imgProperty: {
    id: "",

    clientHeight: undefined,
    clientWidth: undefined,
    naturalHeight: undefined,
    naturalWidth: undefined,
  },
};

const defaultBbox = {
  bbox_id: "",

  originalX: 0,
  originalY: 0,
  originalWidth: 0,
  originalHeight: 0,

  translatedX: 0,
  translatedY: 0,
  translatedWidth: 0,
  translatedHeight: 0,

  originalText: "",
  translatedText: "TRANSLATED",
  fontColor: "#000000",
  fontSize: 15,
  fontFamily: "Open Sans",
  fontWeight: "normal",
  fontStyle: "normal",
};

export const recognitionSlice = createSlice({
  name: "recognition",
  initialState,
  reducers: {
    createBbox: (state, action) => {
      state.bboxList[action.payload.id] = state.bboxList[action.payload.id]
        ? [
            ...state.bboxList[action.payload.id],
            {
              ...defaultBbox,
              ...action.payload.bbox,
            },
          ]
        : [
            {
              ...defaultBbox,
              ...action.payload.bbox,
            },
          ];
    },

    deleteBox: (state, action) => {
      if (action.payload.target === undefined) {
        state.bboxList[action.payload.id] = [];
        state.activeBox = undefined;
      } else {
        state.bboxList[action.payload.id] = state.bboxList[
          action.payload.id
        ].filter((value, index) => index !== action.payload.target);
        state.activeBox = undefined;
      }
    },

    updateBbox: (state, action) => {
      state.bboxList[action.payload.id][action.payload.index] = {
        ...state.bboxList[action.payload.id][action.payload.index],
        ...action.payload.updatedBbox,
      };
    },

    selectBox: (state, action) => {
      state.activeBox = action.payload;
    },

    setImageProperty: (state, action) => {
      const widthRatio =
        action.payload.clientWidth / state.imgProperty.clientWidth;
      const heightRatio =
        action.payload.clientHeight / state.imgProperty.clientHeight;

      if (state.bboxList[action.payload.id]) {
        state.bboxList[action.payload.id] = state.bboxList[
          action.payload.id
        ].map((Bbox) => ({
          ...Bbox,

          originalX: Math.round(Bbox.originalX * widthRatio),
          originalY: Math.round(Bbox.originalY * heightRatio),
          originalWidth: Math.round(Bbox.originalWidth * widthRatio),
          originalHeight: Math.round(Bbox.originalHeight * heightRatio),

          translatedX: Math.round(Bbox.translatedX * widthRatio),
          translatedY: Math.round(Bbox.translatedY * heightRatio),
          translatedWidth: Math.round(Bbox.translatedWidth * widthRatio),
          translatedHeight: Math.round(Bbox.translatedHeight * heightRatio),

          fontSize: Math.round(Bbox.fontSize * widthRatio),
        }));
      }

      state.imgProperty = action.payload;
    },
  },
});

export const {
  createBbox,
  deleteBox,
  updateBbox,
  selectBox,
  setImageProperty,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
