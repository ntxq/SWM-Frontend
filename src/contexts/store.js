import { configureStore } from "@reduxjs/toolkit";
import webtoonDropReducer from "./webtoon-drop-slice";
import recognitionReducer from "./recognition-slice";

export const store = configureStore({
  reducer: {
    webtoons: webtoonDropReducer,
    recognition: recognitionReducer,
  },
});
