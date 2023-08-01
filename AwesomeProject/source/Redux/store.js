import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "./rootReduser";

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
