import { configureStore } from "@reduxjs/toolkit";
import webtoonDropReducer from "./webtoon-drop-slice";

export const store = configureStore({
  reducer: {
    webtoons: webtoonDropReducer,
  },
});
