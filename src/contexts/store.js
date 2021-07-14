import { configureStore } from "@reduxjs/toolkit";
import webtoonDropSlice from "./webtoon-drop-slice";

export const store = configureStore({
  reducer: {
    webtoons: webtoonDropSlice,
  },
});
