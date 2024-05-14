import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './slice/search.ts';
import {settingsSlice} from './slice/pageSettings';
import editorSlice from './slice/editor';
import {normalizedTileCollectionSlice} from './slice/normalizedTileCollections';
import {createLogger} from 'redux-logger';
import {apiSlice} from './slice/apiSlice.ts';
import {isProd} from '../const.ts';
import {authSlice} from './slice/auth.ts';

export const reduxStore = configureStore({
  reducer: {
    [searchSlice.name]: searchSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
    [editorSlice.name]: editorSlice.reducer,
    [normalizedTileCollectionSlice.name]: normalizedTileCollectionSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    let builder: any = getDefaultMiddleware();

    if (!isProd) {
      builder = builder.concat(createLogger({}));
    }

    builder = builder.concat(apiSlice.middleware);

    return builder;
  },
});

export type AppRootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppSelector<S> = (state: AppRootState) => S;
