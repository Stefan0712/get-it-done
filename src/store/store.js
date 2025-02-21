import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import appSettingsReducer from './appSettingsSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    tasks: tasksReducer,
    appSettings: appSettingsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore Redux-Persist action types
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['register', 'rehydrate']
        },
      }),
  });

export const persistor = persistStore(store);
