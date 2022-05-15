import { combineReducers, compose } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { chatsReducer } from "./chats/slice";
import { profileReducer } from "./profile/slice";
import { configureStore } from "@reduxjs/toolkit";

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type StoreState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["profile"],
};
const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
