import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: null,
  stateChange: null,
  email: null,
  photo: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.uid,
      name: payload.displayName,
      email: payload.email,
      photo: payload.photoURL,
      token: payload.token,
    }),
    updateUserPhoto: (state, { payload }) => ({
      ...state,
      photo: payload,
    }),
    stateChangeUser: (state, { payload }) => ({
      ...state,
      stateChange: payload,
    }),
    logOutUser: () => initialState,
  },
});

export const { saveUserProfile, stateChangeUser, logOutUser, updateUserPhoto } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
