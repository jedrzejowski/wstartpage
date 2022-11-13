import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';
import searchSlice from './slice/searchSlice';
import {settingsSlice} from './slice/pageSettings';
import editorSlice from './slice/editor';
import {normalizedTileCollectionSlice} from './slice/normalizedTileCollections';
import {createLogger} from 'redux-logger';
import {isProduction} from './tileCollection';
import {apiBackend} from './api/apiBackend';

export const reduxStore = configureStore({
  reducer: {
    [searchSlice.name]: searchSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
    [editorSlice.name]: editorSlice.reducer,
    [normalizedTileCollectionSlice.name]: normalizedTileCollectionSlice.reducer,
    [apiBackend.reducerPath]: apiBackend.reducer
  },
  middleware: getDefaultMiddleware => {
    let builder: MiddlewareArray<any> = getDefaultMiddleware();

    if (!isProduction) {
      builder = builder.concat(createLogger({}));
    }

    builder = builder.concat(apiBackend.middleware);

    return builder;
  },
});

export type AppRootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppSelector<S> = (state: AppRootState) => S;
