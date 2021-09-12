import { configureStore, combineReducers } from "@reduxjs/toolkit";
import webtoonDropReducer from "./webtoon-drop-slice";
import recognitionReducer from "./recognition-slice";

const combinedReducer = combineReducers({
  webtoons: webtoonDropReducer,
  recognition: recognitionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
