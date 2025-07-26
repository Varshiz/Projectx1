import {configureStore,combineReducers} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import userSlice from './userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer=combineReducers({
    appuser:userSlice,
    apptheme:themeSlice
})
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store =configureStore({
    reducer:
        persistedReducer,
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
    
})
export default store;
export const persistor = persistStore(store);