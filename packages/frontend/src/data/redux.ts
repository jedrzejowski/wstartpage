import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';
import searchSlice from './slice/searchSlice';
import {settingsSlice} from './slice/pageSettings';
import editorSlice from './slice/editorSlice';
import {normalizedIconCollectionSlice} from './slice/normalizedIconCollections';
import {createLogger} from 'redux-logger';
import {isProduction} from '../types';
import {iconCollectionsApi} from './api/iconCollections';

export const reduxStore = configureStore({
  reducer: {
    [searchSlice.name]: searchSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
    [editorSlice.name]: editorSlice.reducer,
    [normalizedIconCollectionSlice.name]: normalizedIconCollectionSlice.reducer,
    [iconCollectionsApi.reducerPath]: iconCollectionsApi.reducer
  },
  middleware: getDefaultMiddleware => {
    let builder: MiddlewareArray<any> = getDefaultMiddleware();

    if (!isProduction) {
      builder = builder.concat(createLogger({}));
    }

    builder = builder.concat(iconCollectionsApi.middleware);

    return builder;
  },
});

export type AppRootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppSelector<S> = (state: AppRootState) => S;
