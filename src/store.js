import {
  PAUSE,
  FLUSH,
  PURGE,
  PERSIST,
  REHYDRATE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './reducers';
import { logger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/lib/persistStore';
import persistReducer from 'redux-persist/lib/persistReducer';

const rootPersistReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    version: 1,
    whitelist: ['auth', 'profile'],
  },
  rootReducer
);

const store = configureStore({
  reducer: rootPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'hospital/register',
          PAUSE,
          FLUSH,
          PURGE,
          PERSIST,
          REHYDRATE,
          REGISTER,
        ],
      },
    }).concat(logger),
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(rootPersistReducer)
  );
}

export const persistor = persistStore(store);

export default store;
