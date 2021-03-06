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
  id: "",
  filename: "",
  original: "",
  inpaint: "",

  cut: [],
  cutCount: 0,
};

const defaultCut = {
  id: "",
  filename: "",
  original: "",
  inpaint: "",

  mask: [],
  progress: 0,
  complete: false,

  cutID: "",
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
    updateCut: (state, action) => {
      state.images[action.payload.index].cut[action.payload.cutIndex] = {
        ...state.images[action.payload.index].cut[action.payload.cutIndex],
        ...action.payload.webtoon,
      };
    },
    updateProgress: (state, action) => {
      if (action.payload.progress)
        state.images[action.payload.index].cut[
          action.payload.cutIndex
        ].progress = action.payload.progress;
    },
    completeCut: (state, action) => {
      const { requestID, cutIndex } = action.payload;

      const webtoonIndex = state.images.findIndex(
        (image) => image.id === requestID
      );

      if (webtoonIndex !== -1)
        state.images[webtoonIndex].cut[cutIndex].complete = true;
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
        if (action.payload && action.payload.hasOwnProperty(image.filename)) {
          image.id = action.payload[image.filename].req_id;
          image.cutCount = action.payload[image.filename].cut_count;

          image.cut = Array.from(
            {
              length: image.cutCount,
            },
            (_, index) => ({
              ...defaultCut,
              id: image.id,
              cutID: index + 1,
              filename: image.filename + ` (Cut ${index + 1})`,
            })
          );
        }
        return image;
      });
    },
  },
});

export const {
  uploadWebtoon,
  updateWebtoon,
  updateCut,
  updateProgress,
  completeCut,
  singleDelete,
  setForm,
  mapIds,
} = webtoonDropSlice.actions;

export default webtoonDropSlice.reducer;
