import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  createTime: "",
  avatar: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
