import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TileCollectionSettingsT, Nullable} from '../tileCollection';
import {apiSlice} from './apiSlice.ts';
import {AppSelector} from '../redux';

type PageSettingsT = Nullable<TileCollectionSettingsT> & {
  viewerTileCollectionName: string | null;
};

const queryParams = new URL(location.href).searchParams;
const initialState: PageSettingsT = {
  viewerTileCollectionName: queryParams.get('tile-collection') ?? null,
  backgroundUrl: null,
  zoomLevel: 100,
  darkMode: null,
  showTitles: true,
  logoUrl: null,
};

export const settingsSlice = createSlice({
  name: 'pageSettings',
  initialState,
  reducers: {
    setIfNotDefaultAction(state, action: PayloadAction<Partial<PageSettingsT>>) {
      for (const key of Object.keys(action.payload) as (keyof PageSettingsT)[]) {
        if (action.payload[key] !== null && state[key] === initialState[key]) {
          // @ts-ignore
          state[key] = action.payload[key];
        }
      }
    },
    setShowDisplayTitlesAction(state, action: PayloadAction<boolean>) {
      state.showTitles = action.payload;
    },
    setDarkModeAction(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    setZoomLevelAction(state, action: PayloadAction<number>) {
      state.zoomLevel = action.payload;
    },
  },
  extraReducers: builder => builder
    .addMatcher(apiSlice.endpoints.getMergedTileCollection.matchFulfilled, (state, action) => {
      Object.assign(state, action.payload.settings);
    })
});

export const {
  setDarkModeAction,
  setIfNotDefaultAction,
  setShowDisplayTitlesAction,
  setZoomLevelAction,
} = settingsSlice.actions;

export const selectPageSettingsZoomLevel: AppSelector<number> = state => state.pageSettings.zoomLevel ?? 100;
export const selectPageSettingsZoomRatio: AppSelector<number> = state => selectPageSettingsZoomLevel(state) / 100;
