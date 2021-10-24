import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bboxList: {},
  activeBbox: undefined,
  nextGroupID: 0,

  translateBoxList: {},
  activeTranslateBox: undefined,
  currentContext: "bbox",

  imgProperty: {
    requestID: "",
    cutIndex: "",

    clientHeight: undefined,
    clientWidth: undefined,
    naturalHeight: undefined,
    naturalWidth: undefined,

    currentWidthRatio: 1,
    currentHeightRatio: 1,
  },
};

const defaultBbox = {
  bbox_id: -1,

  x: 0,
  y: 0,
  width: 0,
  height: 0,

  text: "",
  group_id: -1,
  group_index: 0,
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
        }).fill([]);

      if (!Array.isArray(state.translateBoxList[requestID]))
        state.translateBoxList[requestID] = Array.from({
          length: cutCount,
        }).fill([]);
    },

    createBbox: (state, action) => {
      const { requestID, cutIndex, bbox } = action.payload;

      state.bboxList[requestID][cutIndex] = [
        ...state.bboxList[requestID][cutIndex],
        {
          ...defaultBbox,
          ...bbox,

          bbox_id: state.bboxList[requestID][cutIndex].length,
          group_id: bbox.group_id || state.nextGroupID,
        },
      ];

      if (bbox.group_id) state.nextGroupID = bbox.group_id + 1;
      else state.nextGroupID += 1;
    },

    createTranslateBox: (state, action) => {
      const { requestID, cutIndex, translatedBox } = action.payload;

      state.translateBoxList[requestID][cutIndex] = [
        ...state.translateBoxList[requestID][cutIndex],
        {
          ...defaultTranslateBox,
          ...translatedBox,

          translate_id: state.translateBoxList[requestID][cutIndex].length,
        },
      ];
    },

    deleteBbox: (state, action) => {
      const { target, requestID, cutIndex } = action.payload;

      if (target === undefined) {
        state.bboxList[requestID][cutIndex] = [];
        state.activeBbox = undefined;
        state.activeTranslateBox = undefined;
        state.nextGroupID = 0;
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
      const { requestID, cutIndex, index, updatedBox } = action.payload;

      state.bboxList[requestID][cutIndex][index] = {
        ...state.bboxList[requestID][cutIndex][index],
        ...updatedBox,
      };
    },

    updateTranslateBox: (state, action) => {
      const { requestID, cutIndex, index, updatedBox } = action.payload;

      state.translateBoxList[requestID][cutIndex][index] = {
        ...state.translateBoxList[requestID][cutIndex][index],
        ...updatedBox,
      };
    },

    selectBbox: (state, action) => {
      state.activeBbox = action.payload;
      state.currentContext = "bbox";
    },

    selectTranslateBox: (state, action) => {
      state.activeTranslateBox = action.payload;
      state.currentContext = "translate";
    },

    setImageProperty: (state, action) => {
      const {
        requestID,
        cutIndex,
        clientHeight,
        clientWidth,
        naturalHeight,
        naturalWidth,
      } = action.payload;

      const widthRatio = clientWidth / state.imgProperty.clientWidth;
      const heightRatio = clientHeight / state.imgProperty.clientHeight;

      const adjustBoxList = (boxList) =>
        boxList.map((box) => ({
          ...box,

          x: box.x * widthRatio,
          y: box.y * heightRatio,
          width: box.width * widthRatio,
          height: box.height * heightRatio,
          fontSize: box.fontSize * widthRatio,
        }));

      if (
        state.imgProperty.requestID === requestID &&
        state.imgProperty.cutIndex === cutIndex
      ) {
        state.bboxList[requestID][cutIndex] = adjustBoxList(
          state.bboxList[requestID][cutIndex]
        );
        state.translateBoxList[requestID][cutIndex] = adjustBoxList(
          state.translateBoxList[requestID][cutIndex]
        );
      }

      state.imgProperty = {
        ...action.payload,
        currentWidthRatio: naturalWidth / clientWidth || widthRatio,
        currentHeightRatio: naturalHeight / clientHeight || heightRatio,
      };
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
