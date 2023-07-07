import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: false,

  reducers: {
    isUpdate: (state) => (state = !state),
  },
});

export const postReducer = postSlice.reducer;
export const { isUpdate } = postSlice.actions;
