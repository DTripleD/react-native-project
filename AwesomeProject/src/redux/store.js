import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { postReducer } from "./post/postSlice";

const rootReducer = combineReducers({
  verify: authReducer,
  post: postReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
