import { combineReducers, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chatReducer } from './chats/reducer';
import { profileReducer } from './profile/slice';
import { configureStore } from '@reduxjs/toolkit';

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type StoreState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['profile'],
};
const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
