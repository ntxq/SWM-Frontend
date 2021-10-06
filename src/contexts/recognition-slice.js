import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: {},
  activeBbox: undefined,

  translateBoxList: {},
  activeTranslateBox: undefined,

  imgProperty: {
    requestID: "",
    cutIndex: "",

    clientHeight: undefined,
    clientWidth: undefined,
    naturalHeight: undefined,
    naturalWidth: undefined,
  },
};

const defaultBbox = {
  bbox_id: -1,

  x: 0,
  y: 0,
  width: 0,
  height: 0,

  text: "",
  translateBoxID: -1,
  translateBoxIndex: 0,
};

const defaultTranslateBox = {
  translate_id: -1,

  x: 0,
  y: 0,
  width: 0,
  height: 0,

  text: "",
  fontColor: "#000000",
  fontSize: 30,
  fontFamily: "Nanum Gothic",
  fontWeight: "bold",
  fontStyle: "normal",
};

export const recognitionSlice = createSlice({
  name: "recognition",
  initialState,
  reducers: {
    initializeBoxList: (state, action) => {
      const { requestID, cutCount } = action.payload;

      if (!Array.isArray(state.bboxList[requestID]))
        state.bboxList[requestID] = Array.from({
          length: cutCount,
        });

      if (!Array.isArray(state.translateBoxList[requestID]))
        state.translateBoxList[requestID] = Array.from({
          length: cutCount,
        });
    },

    createBbox: (state, action) => {
      const { requestID, cutIndex, bbox } = action.payload;

      state.bboxList[requestID][cutIndex] = [
        ...state.bboxList[requestID][cutIndex],
        {
          ...defaultBbox,
          ...bbox,

          bbox_id: state.bboxList[requestID][cutIndex].length,
        },
      ];
    },

    createTranslateBox: (state, action) => {
      const { requestID, cutIndex, translateBox } = action.payload;

      state.translateBoxList[requestID][cutIndex] = [
        ...state.translateBoxList[requestID][cutIndex],
        {
          ...defaultTranslateBox,
          ...translateBox,

          translate_id: state.translateBoxList[requestID][cutIndex].length,
        },
      ];
    },

    deleteBbox: (state, action) => {
      const { target, requestID, cutIndex } = action.payload;

      if (target === undefined) {
        state.bboxList[requestID][cutIndex] = [];
        state.activeBbox = undefined;
      } else {
        state.bboxList[requestID][cutIndex] = state.bboxList[requestID][
          cutIndex
        ].filter((_, index) => index !== target);
        state.activeBbox = undefined;
      }
    },

    deleteTranslateBox: (state, action) => {
      const { target, requestID, cutIndex } = action.payload;

      if (target === undefined) {
        state.translateBoxList[requestID][cutIndex] = [];
        state.activeTranslateBox = undefined;
      } else {
        state.translateBoxList[requestID][cutIndex] = state.translateBoxList[
          requestID
        ][cutIndex].filter((_, index) => index !== target);
        state.activeTranslateBox = undefined;
      }
    },

    updateBbox: (state, action) => {
      const { requestID, cutIndex, index, updatedBbox } = action.payload;

      state.bboxList[requestID][cutIndex][index] = {
        ...state.boxList[requestID][cutIndex][index],
        ...updatedBbox,
      };
    },

    updateTranslateBox: (state, action) => {
      const { requestID, cutIndex, index, updatedTranslateBox } =
        action.payload;

      state.translateBoxList[requestID][cutIndex][index] = {
        ...state.translateBoxList[requestID][cutIndex][index],
        ...updatedTranslateBox,
      };
    },

    selectBbox: (state, action) => {
      state.activeBox = action.payload;
    },

    selectTranslateBox: (state, action) => {
      state.activeTranslateBox = action.payload;
    },

    setImageProperty: (state, action) => {
      const { requestID, cutIndex, clientHeight, clientWidth } = action.payload;

      const widthRatio = clientWidth / state.imgProperty.clientWidth;
      const heightRatio = clientHeight / state.imgProperty.clientHeight;

      const adjustBoxList = (boxList) => {
        boxList.map((box) => ({
          ...box,

          x: box.x * widthRatio,
          y: box.y * heightRatio,
          width: box.width * widthRatio,
          height: box.height * heightRatio,
          fontSize: box.fontSize * widthRatio,
        }));
      };

      if (
        state.imgProperty.requestID === requestID &&
        state.imgProperty.cutIndex === cutIndex
      ) {
        adjustBoxList(state.bboxList[requestID][cutIndex]);
        adjustBoxList(state.translateBoxList[requestID][cutIndex]);
      }

      state.imgProperty = action.payload;
    },
  },
});

export const {
  initializeBoxList,
  createBbox,
  createTranslateBox,
  deleteBbox,
  deleteTranslateBox,
  updateBbox,
  updateTranslateBox,
  selectBbox,
  selectTranslateBox,
  setImageProperty,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
