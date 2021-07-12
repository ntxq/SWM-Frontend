import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const webtoonDropSlice = createSlice({
  name: "webtoonDrop",
  initialState,
  reducers: {
    upload: (state, action) => {
      state.images = state.images.concat(action.payload);
    },
  },
});

export const { upload } = webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
