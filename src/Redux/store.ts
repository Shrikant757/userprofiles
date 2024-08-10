import { configureStore } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { RootReducer } from './RootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userProfiles'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);
export const persistor = persistStore(store);
