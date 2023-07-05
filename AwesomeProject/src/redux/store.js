// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./auth/authSlice";
// import { postReducer } from "./post/postSlice";

// const rootReducer = combineReducers({
//   verify: authReducer,
//   post: postReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export { store };

//WITH PERSIST

import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postReducer } from "./post/postSlice";
// import { authReducer } from "./auth/authSlice";

const persistConfig = {
  key: "post",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    // auth: persistReducer(persistConfig, authReducer),
    post: persistReducer(persistConfig, postReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export default { store, persistor };

// import { configureStore } from "@reduxjs/toolkit";

// // import { filtersReducer } from "./filtersSlice";
// import { postReducer } from "./post/postSlice";

// export const store = configureStore({
//   reducer: {
//     post: postReducer,
//     // auth: authSlice,
//   },
// });
