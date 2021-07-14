import { configureStore } from "@reduxjs/toolkit";
import webtoonDropSlice from "./webtoonDropSlice";

export const store = configureStore({
  reducer: {
    webtoons: webtoonDropSlice,
  },
});
