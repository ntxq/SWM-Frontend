import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    new: "new",
    title: "Title",
    language: ["Korean", "English"],
  },
  images: [],
};

export const webtoonDropSlice = createSlice({
  name: "webtoonDrop",
  initialState,
  reducers: {
    upload: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    singleInpaint: (state, action) => {
      state.images[action.payload[0]][2] = action.payload[1];
    },
    singleDelete: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const { upload, singleInpaint, singleDelete, setForm } =
  webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
