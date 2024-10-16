import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userslice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'rootpurewatt',
    storage,
    version: 1,
}

const rootReducer = combineReducers({user: userReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

//persist pacckage is to save the redux values in browser storage
