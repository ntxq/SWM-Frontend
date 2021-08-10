import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    new: "new",
    title: "Title",
    language: ["Korean", "English"],
  },
  images: [],
};

const defaultImage = {
  original: "",
  inpaint: "",
  mask: [],
  filename: "",
  id: "",
};

export const webtoonDropSlice = createSlice({
  name: "webtoonDrop",
  initialState,
  reducers: {
    uploadWebtoon: (state, action) => {
      state.images = [
        ...state.images,
        {
          ...defaultImage,
          ...action.payload,
        },
      ];
    },
    updateWebtoon: (state, action) => {
      state.images[action.payload.index] = {
        ...state.images[action.payload.index],
        ...action.payload.webtoon,
      };
    },
    singleDelete: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },
    setForm: (state, action) => {
      state.form = action.payload;

      if (
        !Array.isArray(state.form.langauge) ||
        state.form.language.length === 0
      )
        state.form.language = ["Korean", "English"];

      if (!state.form.title) state.form.title = "Title";
    },
    mapIds: (state, action) => {
      state.images = state.images.map((image) => {
        if (action.payload && action.payload.hasOwnProperty(image.filename))
          image.id = action.payload[image.filename];

        return image;
      });
    },
  },
});

export const { uploadWebtoon, updateWebtoon, singleDelete, setForm, mapIds } =
  webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
