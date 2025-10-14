import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // we can use different type of stoarges using redux-persist
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { PERSIST } from "redux-persist";

import themeSlice from "./slices/ThemeSlice";
import counterSlice from "./slices/CounterSlice";


// Combine all individual slice reducers: it's important & necessary
const rootReducer = combineReducers({
    theme: themeSlice,
    counter: counterSlice,
});

const persistConfig = {
    key: 'redux-persist',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
            serializableCheck:{
                ignoreActions: [PERSIST],
            },
        })
})

export const persistedStore = persistStore(store)