import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const webtoonDropSlice = createSlice({
  name: "webtoonDrop",
  initialState,
  reducers: {
    upload: (state, action) => {
      state.images = state.images.concat([action.payload]);
    },
    singleInpaint: (state, action) => {
      state.images[action.payload[0]][2] = action.payload[1];
    },
    singleDelete: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },
  },
});

export const { upload, singleInpaint, singleDelete } = webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
