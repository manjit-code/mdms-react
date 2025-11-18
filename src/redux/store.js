import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { PERSIST } from "redux-persist";

import themeSlice from "./slices/ThemeSlice";
import counterSlice from "./slices/CounterSlice";
import authSlice from "./slices/AuthSlice"

// Combine all reducers
const rootReducer = combineReducers({
  theme: themeSlice,
  counter: counterSlice,
  auth: authSlice,                              
});

// Persist config
const persistConfig = {
  key: "redux-persist",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST],
      },
    }),
});

export const persistedStore = persistStore(store);
