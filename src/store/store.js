import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage for client-side
import rootReducer from "./reducers/rootReducer";

// Check if the environment is a browser
const isClient = typeof window !== "undefined";

// Persist config for the `cart` slice
const persistConfig = {
  key: "root",
  storage: isClient ? AsyncStorage : null, // Use AsyncStorage only on the client
  whitelist: ["cart"], // Persist only the `cart` slice
};

// Conditionally apply the persisted reducer
const persistedReducer = isClient
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persist store only if it's on the client side
export const persistor = isClient ? persistStore(store) : null;

export default store;
