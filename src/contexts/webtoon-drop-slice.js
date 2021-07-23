import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    new: "new",
    title: "Title",
    language: ["Korean", "English"],
  },
  images: [],
  mask: {},
};

export const webtoonDropSlice = createSlice({
  name: "webtoonDrop",
  initialState,
  reducers: {
    uploadOriginal: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    uploadInpaint: (state, action) => {
      state.images[action.payload.index].inpaint = action.payload.inpaint;
    },
    uploadMask: (state, action) => {
      state.mask = action.payload;
    },
    singleDelete: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    mapIds: (state, action) => {
      state.images = state.images.map((image) => {
        image.id = action.payload[image.filename];
        return image;
      });
    },
  },
});

export const {
  uploadOriginal,
  uploadInpaint,
  uploadMask,
  singleDelete,
  setForm,
  mapIds,
} = webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
