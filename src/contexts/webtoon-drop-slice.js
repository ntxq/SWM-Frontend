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
    uploadOriginal: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    uploadInapint: (state, action) => {
      state.images[action.payload.index].inpaint = action.payload.inpaint;
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

export const { uploadOriginal, uploadInapint, singleDelete, setForm } =
  webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
